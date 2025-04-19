import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Users, Split, PlusCircle } from "lucide-react";
import SplitTheBill from "./SplitTheBill";
import Footer from "./Footer";
import Header from "./Header";

function Hero() {
  const [people, setPeople] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [entries, setEntries] = useState([]);
  const [finalData, setFinalData] = useState(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const handleGenerate = () => {
    const number = parseInt(inputValue);
    if (!isNaN(number) && number > 0) {
      setPeople(number);
      const temp = Array.from({ length: number }, () => ({
        name: "",
        amount: "",
      }));
      setEntries(temp);
      setFinalData(null);
      setIsInputDisabled(true);
      toast.success("Input fields generated!");
    } else {
      toast.error("Please enter a valid number.");
    }
  };

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
    setFinalData(null);
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    setFinalData(null);
  };

  const handleSplitClick = () => {
    const valid = entries.every((entry) => entry.name && !isNaN(entry.amount));
    if (!valid) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    const formattedData = {};
    entries.forEach((entry) => {
      formattedData[entry.name] = parseFloat(entry.amount);
    });

    setFinalData(formattedData);
    toast.success("Splitting done! 🎉");
  };

  return (
    <div className="bg-gradient-to-b from-[#8fb7ca] via-[#2b6696] to-[#102765]">
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#8fb7ca] via-[#2b6696] to-[#102765] flex items-center justify-center px-4 py-8">
        <Toaster />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl bg-white/20 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/30"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md tracking-tight">
              HisaabHawk
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/90">
              Built for friends. Backed by{" "}
              <span className="font-semibold text-yellow-200">fairness.</span>
              <br />
              <span className="font-bold text-pink-200">
                Because every paisa counts — and friendships too!
              </span>
            </p>
            <p className="mt-2 text-lg sm:text-xl text-white/80 italic">
              No more ‘you owe me’ fights — we got you!
            </p>
          </div>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <label className="text-white font-medium text-lg flex items-center gap-1">
              <img src="friends.png" alt="" className="w-12 h-12" />
              How many friends?
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputValueChange}
              disabled={isInputDisabled}
              placeholder="Enter a number"
              className="border border-white/30 bg-white/10 text-white placeholder-white/70 rounded-xl px-4 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              className="bg-yellow-100 text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-yellow-200 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <PlusCircle size={18} /> Generate Inputs
            </motion.button>
          </div>

          {/* Entry Section */}
          <div className="mt-10 flex flex-col items-center gap-6">
            {entries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full sm:w-auto text-center"
              >
                <div className="text-white font-semibold text-lg mb-2 px-4 py-2 rounded-xl bg-white/10 flex items-center gap-2 justify-center">
                  <img src="person.png" alt="" className="h-5 w-5" />
                  Person {index + 1}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <input
                    type="text"
                    placeholder="Name"
                    value={entry.name}
                    onChange={(e) =>
                      handleEntryChange(index, "name", e.target.value)
                    }
                    className="border border-white/30 bg-white/10 text-white placeholder-white/70 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white transition"
                  />
                  <input
                    type="number"
                    placeholder="Amount spent"
                    value={entry.amount}
                    onChange={(e) =>
                      handleEntryChange(index, "amount", e.target.value)
                    }
                    className="border border-white/30 bg-white/10 text-white placeholder-white/70 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white transition"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Split Button */}
          {entries.length > 0 && (
            <div className="flex justify-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSplitClick}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                ✨ Split Now
              </motion.button>
            </div>
          )}

          {/* Output Section */}
          {finalData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-inner text-white/90"
            >
              <SplitTheBill data={finalData} />
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Hero;
