import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [curremcyNamesResponse, setCurrencyNamesRespoonse] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNamesRespoonse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className="lg:mx-32 text-4xl font-bold text-orange-500">
        Convert Your Currencies Today
      </h1>
      <p className="lg:mx-32 opacity-60 py-6">
        Welcome to " Convert Your Currencies Today "! This application allows
        Your to easily convert currencies based on the latest exchange rate.
        Whether you're planning a trip, manging your finance or simply curious
        about the value of your money in different currencies, this tool is here
        to help.
      </p>
      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="lg:w-1/2 w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                id={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-orange-500 dark:focus:border-orange-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                type="text"
                id={sourceCurrency}
                name={sourceCurrency}
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-orange-500 dark:focus:border-orange-500"
                required
              >
                <option value="">Select Source Currency</option>
                {Object.keys(curremcyNamesResponse).map((oneCurrency) => (
                  <option className="p-1" key={oneCurrency} value={oneCurrency}>
                    {curremcyNamesResponse[oneCurrency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                type="text"
                id={targetCurrency}
                name={targetCurrency}
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-orange-500 dark:focus:border-orange-500"
                required
              >
                <option value="">Select Target Currency</option>
                {Object.keys(curremcyNamesResponse).map((onecurrency) => (
                  <option className="p-1" key={onecurrency} value={onecurrency}>
                    {curremcyNamesResponse[onecurrency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount in Source Currency
              </label>
              <input
                type="number"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-orange-500 dark:focus:border-orange-500"
                placeholder="Amount in Source Currency"
                required
              />
            </div>

            <button className="bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded-md">
              Get the target Currency
            </button>
          </form>
        </section>
      </div>

      {!loading ? (
        <section className="lg:mx-72 mt-5">
          <span className="text-orange-500 font-bold">
            {amountInSourceCurrency}
          </span>{" "}
          amount of {sourceCurrency} is equal to {targetCurrency}{" "}
          <span className="text-orange-500 font-bold">
            {amountInTargetCurrency}
          </span>
        </section>
      ) : null}
    </div>
  );
}
