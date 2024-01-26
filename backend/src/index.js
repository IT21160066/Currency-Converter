const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//get request and response
app.get("/getAllCurrencies", async (req, res) => {
  const namesURL = `https://openexchangerates.org/api/currencies.json?app_id=2094e7fc83184ed4b14e01d43e7a3064`;

  try {
    const namesRespone = await axios.get(namesURL);
    const namesData = namesRespone.data;
    return res.json(namesData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  try {
    const convert = `https://openexchangerates.org/api/historical/${date}.json?app_id=2094e7fc83184ed4b14e01d43e7a3064`;
    const dataResponse = await axios.get(convert);
    const rates = dataResponse.data.rates;

    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmount.toFixed(2));
  } catch (error) {
    console.log(error);
  }
});

//listen to a port
app.listen(5000, () => {
  console.log("SERVER STARTED ON PORT 5000");
});
