"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function PasswordGenerator() {
  const [isClient, setIsClient] = useState(false); // ✅ Track client-side rendering
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState("");

  // ✅ Only set "isClient" once mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Generate password only on the client
  const generatePassword = useCallback(() => {
    if (!isClient) return; // ✅ Prevent SSR issues

    let characters = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+[]{}<>?";

    let newPassword = Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");

    setPassword(newPassword);
  }, [length, includeNumbers, includeSymbols, includeUppercase, isClient]);

  // ✅ Ensure password is generated only when settings change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (typeof window !== "undefined" && password) {
      navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    }
  };

  // ✅ Fix SSR issue: Hide component until it's mounted
  if (!isClient) return null;

  return (
    <div className="password-generator">
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Password Generator</h2>

        <div className="mt-4 text-left">
          <label className="block text-gray-700 dark:text-gray-300">Length: {length}</label>
          <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="mt-4 flex flex-col items-start space-y-2">
          <label className="flex items-center">
            <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Include Uppercase</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Include Numbers</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Include Symbols</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-4">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full p-2 text-center bg-gray-100 dark:bg-gray-700 rounded-md"
            />
            <button
              onClick={copyToClipboard}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
    
  );
}
