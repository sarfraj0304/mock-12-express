const mongoose = require("mongoose");

const InvestmentSchema = mongoose.Schema({
  AnnualInvestment: { type: Number, required: true },
  rate: { type: Number, required: true },
  years: { type: Number, required: true },
});

const InvestmentModel = mongoose.model("Investment", InvestmentSchema);
module.exports = {
  InvestmentModel,
};
