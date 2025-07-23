import nodemailer from "nodemailer";
import dotenv from "dotenv";
//import pdf from "../controllers/students.js";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const SMTP_HOST = process.env.SMTP_EMAIL || "welfare.univ.jfn.ac.lk";
const SMTP_EMAIL = process.env.SMTP_EMAIL || "johndoe.teamproject@gmail.com";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "Asd123!@#";
const SMTP_PORT = process.env.SMTP_PORT || 587;

//data = {to, subject, text, html, attachment: pdf object goes here}

// to=
// subject = "Student Bursary form"
// text = "Thank you to fill the form and if you have any problem contact welfare office "
//attachment = pdf;

// const data = {
//   //to: "vvvttt479@gmail.com",
//   subject: "Student Bursary form",
//   text: "Bursary_Form",
//   html: "<h1>Filled Form</h1>",
//   attachment: [
//     {
//       raw:
//         "Content-Type: text/plain\r\n" +
//         "Content-Disposition: attachment;\r\n" +
//         "\r\n" +
//         "Hello world!",
//     },
//   ],
// };

export default ({ to, from, subject, text, attachments }) => {
  let transporterOptions = {
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  };

  if (NODE_ENV === "production") {
    transporterOptions = {
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    };
  }

  const transporter = nodemailer.createTransport(transporterOptions);

  const mailOptions = {
    from: from || SMTP_EMAIL,
    to,
    subject,
    text,
    //html: "<h1>Filled Form</h1>",
    attachments,
  };

  transporter.sendMail(mailOptions, (err) =>
    err ? console.log(err) : console.log(`Mail sent to ${mailOptions.to}`)
  );
  console.log("success!!");
};
