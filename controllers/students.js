import Student from "../models/student.js";
import pdfMake from "pdfmake/build/pdfmake.js";
import PDF_Fonts from "pdfmake/build/vfs_fonts.js";
import { json, response } from "express";
import bodyParser from "body-parser";
import { getDocumentDefinition } from "../services/pdf.js";

import getAmounts from "../utils/getAmounts.js";
import sendMail from "../services/sendMail.js";
import { getDocDefinition } from "../services/summary1.js";
//import JSON  from 'nodemon/lib/utils'

pdfMake.vfs = PDF_Fonts.pdfMake.vfs;

export const getStudents = async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createStudent = async (req, res, next) => {
  const [netAmount, capAmount] = getAmounts(req.body);
  const isValidCandidate = netAmount <= capAmount;

  try {
    const newStudent = new Student({
      ...req.body,
      netAmount,
      capAmount,
      isValidCandidate,
    });
    await newStudent.save();
    const pdfDoc = pdfMake.createPdf(
      getDocumentDefinition("application", req.body)
    );

    //Try to save
    var data;
    pdfDoc.getBase64(function (encodedString) {
      data = encodedString;
    });

    pdfDoc.getBase64((data) => {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment;filename="filename.pdf"',
      });
      //stu_Doc = data.toString("utf-8");

      const download = Buffer.from(data.toString("utf-8"), "base64");
      const { email, fullName } = req.body;
      sendMail({
        to: email,
        subject: "Bursary Application",
        text: "some text",
        attachments: {
          filename: `Bursary Applicatoin - ${fullName}.pdf`,
          content: download,
        },
      });
      res.end(download);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const [netAmount, capAmount] = getAmounts(req.body);
  const isValidCandidate = netAmount <= capAmount;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          netAmount,
          capAmount,
          isValidCandidate,
        },
      },
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const PDFStudent = async (req, res) => {
  const pdfDoc = pdfMake.createPdf(getDocDefinition("application", req.body));

  pdfDoc.getBase64((data) => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment;filename="filename.pdf"',
    });

    const download = Buffer.from(data.toString("utf-8"), "base64");
    res.end(download);
  });

  console.log("sucessfully Done!");
};

export const getInstallments = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "installments.installmentId"
    );
    res.status(200).json(student.installments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
