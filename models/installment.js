import mongoose from "mongoose";

const installmentSchema = mongoose.Schema({
  //or Faculty
  stream: {
    type: String,
    required: true,
  },
  //years of studies
  year: {
    type: String,
    required: true,
  },
  noOfInstallments: {
    type: Number,
    required: true,
  },
  acadamicYear: {
    type: String,
    required: true,
  },
  //from which year
  from: {
    type: String,
    required: true,
  },
  // to which year
  to: {
    type: String,
    required: true,
  },
});

const Installment = mongoose.model("installment", installmentSchema);

export default Installment;
