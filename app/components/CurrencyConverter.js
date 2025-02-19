"use client";

import React, { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rates, setRates] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch exchange rates
  const fetchRates = async () => {
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await res.json();
      setRates(data.rates);
      setLastUpdated(new Date().toLocaleTimeString()); // Save the last update time
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  // Fetch exchange rates on component mount and every 60 seconds
  useEffect(() => {
    fetchRates(); // Initial fetch
    const interval = setInterval(fetchRates, 60000); // Fetch every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fromCurrency]);

  // Perform conversion when amount, toCurrency, or rates change
  useEffect(() => {
    if (rates && toCurrency) {
      const converted = (amount * rates[toCurrency]).toFixed(2);
      setConvertedAmount(converted);
    }
  }, [amount, toCurrency, rates]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Currency Converter</h2>

      {/* Amount Input */}
      <div className="mt-4 text-left">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700"
        />
      </div>

      {/* From Currency Selection */}
      <div className="mt-4 text-left">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">From</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-3 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="NGN">NGN - Nigerian Naira</option>
          <option value="UGX">UGX - Ugandan Shilling</option>
          <option value="ZAR">ZAR - South African Rand</option>
        </select>
      </div>

      {/* To Currency Selection */}
      <div className="mt-4 text-left">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">To</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-3 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="NGN">NGN - Nigerian Naira</option>
          <option value="UGX">UGX - Ugandan Shilling</option>
          <option value="ZAR">ZAR - South African Rand</option>
        </select>
      </div>

      {/* Converted Amount Display */}
      {convertedAmount && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-lg font-semibold text-gray-800 dark:text-white">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>
      )}

      {/* Last Updated Time */}
      {lastUpdated && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated}
        </p>
      )}
    </div>
  );
}
