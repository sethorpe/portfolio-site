"use client";

import React, { useState, useEffect } from "react";

export default function Converter() {
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("meters");
  const [convertedValue, setConvertedValue] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || value === "") return;

    const convertValue = (input, fromUnit) => {
      let result = "";

      switch (fromUnit) {
        case "meters":
          result = (input * 3.28084).toFixed(2) + " feet";
          break;
        case "feet":
          result = (input / 3.28084).toFixed(2) + " meters";
          break;
        case "centimeters":
          result = (input / 2.54).toFixed(2) + " inches";
          break;
        case "inches":
          result = (input * 2.54).toFixed(2) + " cm";
          break;
        case "kilograms":
          result = (input * 2.20462).toFixed(2) + " lbs";
          break;
        case "pounds":
          result = (input / 2.20462).toFixed(2) + " kg";
          break;
        case "celsius":
          result = ((input * 9) / 5 + 32).toFixed(2) + " °F";
          break;
        case "fahrenheit":
          result = (((input - 32) * 5) / 9).toFixed(2) + " °C";
          break;
        case "liters":
          result = (input * 0.264172).toFixed(2) + " gallons";
          break;
        case "gallons":
          result = (input / 0.264172).toFixed(2) + " liters";
          break;
        case "kmph":
          result = (input / 1.609).toFixed(2) + " mph";
          break;
        case "mph":
          result = (input * 1.609).toFixed(2) + " km/h";
          break;
        default:
          result = "";
      }

      setConvertedValue(result);
    };

    convertValue(value, unit);
  }, [isClient, value, unit]);

  if (!isClient) return null;

  return (
    // <div className="converter">
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Unit Converter</h2>

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="w-full p-2 mt-4 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700"
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full p-2 mt-4 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700"
        >
          <optgroup label="Length">
            <option value="meters">Meters → Feet</option>
            <option value="feet">Feet → Meters</option>
            <option value="centimeters">Centimeters → Inches</option>
            <option value="inches">Inches → Centimeters</option>
          </optgroup>
          <optgroup label="Weight">
            <option value="kilograms">Kilograms → Pounds</option>
            <option value="pounds">Pounds → Kilograms</option>
          </optgroup>
          <optgroup label="Temperature">
            <option value="celsius">Celsius → Fahrenheit</option>
            <option value="fahrenheit">Fahrenheit → Celsius</option>
          </optgroup>
          <optgroup label="Volume">
            <option value="liters">Liters → Gallons</option>
            <option value="gallons">Gallons → Liters</option>
          </optgroup>
          <optgroup label="Speed">
            <option value="kmph">Kilometers per Hour → Miles per Hour</option>
            <option value="mph">Miles per Hour → Kilometers per Hour</option>
          </optgroup>
        </select>

        {convertedValue && (
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-lg font-semibold text-gray-800 dark:text-white">
            {convertedValue}
          </div>
        )}
      </div>
    // </div>
    
  );
}
