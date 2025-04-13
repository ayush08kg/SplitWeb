import React, { useState } from "react";
import SplitTheBill from "./SplitTheBill";

function Hero() {
  const [people, setPeople] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [entries, setEntries] = useState([]);
  const [finalData, setFinalData] = useState(null); // Data to pass to SplitTheBill
  const [isInputDisabled, setIsInputDisabled] = useState(false); // Disable input after generate

  const handleGenerate = () => {
    const number = parseInt(inputValue);
    if (!isNaN(number) && number > 0) {
      setPeople(number);
      const temp = Array.from({ length: number }, () => ({
        name: "",
        amount: "",
      }));
      setEntries(temp);
      setFinalData(null); // reset result if number of people is changed
      setIsInputDisabled(true); // disable the input
    } else {
      alert("Please enter a valid number.");
    }
  };

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
    setFinalData(null); // reset result if any name or amount is changed
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    setFinalData(null); // reset result if number input is modified
  };

  const handleSplitClick = () => {
    const valid = entries.every((entry) => entry.name && !isNaN(entry.amount));
    if (!valid) {
      alert("Please fill out all fields with valid data.");
      return;
    }

    const formattedData = {};
    entries.forEach((entry) => {
      formattedData[entry.name] = parseFloat(entry.amount);
    });

    setFinalData(formattedData); // Send to SplitTheBill
  };

  return (
    <div className="max-w-3xl mx-auto my-12 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Splity Page</h1>
      <h3 className="text-lg text-gray-600 text-center mt-5">
        Don't think too much about who owes what, we make splitting expenses <br />Easy and Fair!
      </h3>

      {/* Input for number of people */}
      <div className="flex justify-center mt-12">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Enter No. of folks:</h3>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputValueChange}
            disabled={isInputDisabled}
            className="border border-black rounded-xl px-3 py-2"
          />
        </div>
      </div>

      {/* Generate button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleGenerate}
          className="bg-black px-5 py-3 text-white rounded-3xl border border-blue-500"
        >
          Generate
        </button>
      </div>

      {/* Name and Amount Inputs */}
      <div className="mt-10 flex flex-col items-center gap-4">
        {entries.map((entry, index) => (
          <div key={index} className="flex gap-4 w-full justify-center">
            <input
              type="text"
              placeholder={`Name ${index + 1}`}
              value={entry.name}
              onChange={(e) => handleEntryChange(index, "name", e.target.value)}
              className="border border-black rounded-xl px-3 py-2"
            />
            <input
              type="number"
              placeholder={`Amount ${index + 1}`}
              value={entry.amount}
              onChange={(e) => handleEntryChange(index, "amount", e.target.value)}
              className="border border-black rounded-xl px-3 py-2"
            />
          </div>
        ))}

        {/* Split Button */}
        {entries.length > 0 && (
          <button
            onClick={handleSplitClick}
            className="mt-8 bg-green-600 px-5 py-3 text-white rounded-3xl border border-blue-500"
          >
            Split
          </button>
        )}
      </div>

      {/* Render SplitTheBill only when data is available */}
      {finalData && (
        <div className="mt-10">
          <SplitTheBill data={finalData} />
        </div>
      )}
    </div>
  );
}

export default Hero;
