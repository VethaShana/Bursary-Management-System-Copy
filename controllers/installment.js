import Installment from '../models/installment.js'
import Student from '../models/student.js'
import pdfMake from 'pdfmake/build/pdfmake.js'
import PDF_Fonts from 'pdfmake/build/vfs_fonts.js'
import { uoj } from '../utils/Uojlogo.js'

pdfMake.vfs = PDF_Fonts.pdfMake.vfs

export const getInstallments = async (req, res) => {
	try {
		const installment = await Installment.find()
		res.status(200).json(installment)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const createInstallments = async (req, res) => {
	const {
		date,
		faculty,
		course,
		academicYear,
		description,
		noOfInstallments
	} = req.body
	const newInstallment = new Installment({
		date,
		faculty,
		course,
		academicYear,
		description,
		noOfInstallments
	})
	try {
		await newInstallment.save().then((doc, err) => {
			Student.updateMany(
				{ course },
				{
					$push: {
						installments: {
							installmentId: doc._id,
							noOfInstallments
						}
					}
				},
				{ multi: true }
			).exec()
		})
		res.status(200).json(newInstallment)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateInstallment = async (req, res) => {
	try {
		const installment = await Installment.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					...req.body
				}
			},
			{ new: true }
		)
		res.status(200).json(installment)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
