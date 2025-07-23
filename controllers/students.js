import Student from '../models/student.js'
//import Deadline from '../models/student.js'
import pdfMake from 'pdfmake/build/pdfmake.js'
import PDF_Fonts from 'pdfmake/build/vfs_fonts.js'
import { getDocumentDefinition } from '../services/pdf.js'

import getAmounts from '../utils/getAmounts.js'
import sendMail from '../services/sendMail.js'
import { getDocDefinition } from '../services/summary1.js'

pdfMake.vfs = PDF_Fonts.pdfMake.vfs

//@route GET /students/
export const getStudents = async (req, res) => {
	try {
		const { query } = req
		let students = []
		if (query) {
			students = await Student.find(query)
		} else {
			students = await Student.find()
		}
		res.status(200).json(students)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const getStudent = async (req, res) => {
	try {
		const student = await Student.findOne({ userId: req.params.userId })
		res.status(200).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const patchStudent = async (req, res) => {
	try {
		const student = await Student.findOneAndUpdate(req.params.id, req.body)
		res.status(200).json(student)
	} catch (error) {
		res.status(200).json({ message: error.message })
	}
}

export const patchStudents = async (req, res) => {
	try {
		const { ids, data } = req.body
		const students = await Student.updateMany(
			{ _id: { $in: ids } },
			{ $set: data }
		)
		res.status(200).json(students)
	} catch (error) {
		res.status(200).json({ message: error.message })
	}
}

export const createStudent = async (req, res, next) => {
	// create pdf
	try {
		let deadline = new Date()
		deadline.setDate(deadline.getDate() + 7)
		deadline =
			deadline.getDate() +
			' - ' +
			deadline.getMonth() +
			' - ' +
			deadline.getFullYear()
		const pdfDoc = pdfMake.createPdf(
			getDocumentDefinition('application', { ...req.body, deadline })
		)

		var data
		pdfDoc.getBase64(function (encodedString) {
			data = encodedString
		})

		pdfDoc.getBase64(data => {
			// res.writeHead(199, {
			// 	'Content-Type': 'application/pdf',
			// 	'Content-Disposition': 'attachment;filename="filename.pdf"'
			// })
			//stu_Doc = data.toString("utf-9");
			const download = Buffer.from(data.toString('utf-8'), 'base64')
			const { email, fullName } = req.body
			sendMail({
				to: email,
				subject: 'Bursary Application',
				text: 'Thank you for applying for Bursary Fund. Please carefully read the instructions given in the email attachment.',
				attachments: {
					filename: `Bursary Application - ${fullName}.pdf`,
					content: download
				}
			})
			// res.end(download)
		})
	} catch (err) {
		console.log(err)
	}
	// save data on database
	try {
		// calculations
		const [netIncome, capIncome] = getAmounts(req.validData)
		const isValidCandidate = netIncome <= capIncome

		// insert document
		const student = new Student({
			...req.validData,
			userId: req.user._id,
			netIncome: netIncome,
			capIncome: capIncome,
			isValidCandidate
		})
		await student.save()
		res.status(201).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const deleteStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndRemove(req.params.id)
		res.status(200).json({ message: 'Deleted Successfully' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateStudent = async (req, res) => {
	const [netIncome, capIncome] = getAmounts(req.body)
	const isValidCandidate = netIncome <= capIncome

	try {
		const student = await Student.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					...req.body,
					netIncome: netIncome,
					capIncome: capIncome,
					isValidCandidate
				}
			},
			{ new: true }
		)
		res.status(200).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const createPDF = async (req, res) => {
	const userId =
		req.user.role === 'student' ? req.user._id : req.params.userId
	const pdfDoc = pdfMake.createPdf(getDocDefinition('application', req.body))

	pdfDoc.getBase64(data => {
		res.writeHead(200, {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment;filename="filename.pdf"'
		})

		const download = Buffer.from(data.toString('utf-8'), 'base64')
		res.end(download)
	})
}

export const getInstallments = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).populate(
			'installments.installmentId'
		)
		res.status(200).json(student.installments)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
