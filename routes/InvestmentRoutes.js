const { Router } = require("express");
const InvestmentRouter = Router();
const { InvestmentModel } = require("../models/Investment");

InvestmentRouter.post("/", async (req, res) => {
  const { AnnualInvestment, rate, years } = req.body;
  try {
    const finalRate = rate / 100;
    const Maturity = Math.floor(
      AnnualInvestment * (((1 + finalRate) ** years - 1) / finalRate)
    );

    const TotalInvestment = AnnualInvestment * years;
    const TotalInterest = Maturity - TotalInvestment;

    res.send({
      TotalMaturity: Maturity,
      TotalInvestment: TotalInvestment,
      TotalInterest: TotalInterest,
    });
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = {
  InvestmentRouter,
};
