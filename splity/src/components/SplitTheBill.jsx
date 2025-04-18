import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SplitTheBill = ({ data }) => {
  const [transactions, setTransactions] = useState([]);
  const [perShare, setPerShare] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!data) return;

    let sum = 0;
    for (const key in data) {
      sum += data[key];
    }

    const perPerson = sum / Object.keys(data).length;
    setPerShare(perPerson.toFixed(2));
    setTotalAmount(sum.toFixed(2));

    const debtors = [];
    const creditors = [];

    for (const key in data) {
      const amt = data[key];
      if (amt > perPerson) {
        creditors.push({ name: key, amount: +(amt - perPerson).toFixed(2) });
      } else if (amt < perPerson) {
        debtors.push({ name: key, amount: +(perPerson - amt).toFixed(2) });
      }
    }

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const result = [];
    let i = 0,
      j = 0;

    while (i < debtors.length && j < creditors.length) {
      const d = debtors[i];
      const c = creditors[j];

      if (d.amount <= c.amount) {
        result.push({
          from: d.name,
          to: c.name,
          amount: d.amount.toFixed(2),
        });
        creditors[j].amount -= d.amount;
        i++;
      } else {
        result.push({
          from: d.name,
          to: c.name,
          amount: c.amount.toFixed(2),
        });
        debtors[i].amount -= c.amount;
        j++;
      }
    }

    setTransactions(result);
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl mt-10 shadow-lg border border-white/20"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Transaction Summary 💸</h2>
        <p className="text-lg text-black/80 mb-1">Total Spent: <span className="font-semibold text-blue-700">₹{totalAmount}</span></p>
        <p className="text-lg text-black/80 mb-6">Each Person Should Pay: <span className="font-semibold text-blue-700">₹{perShare}</span></p>
      </div>

      {transactions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {transactions.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 rounded-xl p-4 text-gray-800 shadow-md"
            >
              <p className="text-center font-medium">
                <span className="text-red-600 font-semibold">{t.from}</span>{" "}
                <span className="text-gray-600">pays</span>{" "}
                <span className="text-green-600 font-semibold">₹{t.amount}</span>{" "}
                <span className="text-gray-600">to</span>{" "}
                <span className="text-blue-600 font-semibold">{t.to}</span>
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white/90 mt-6">No transactions to display.</p>
      )}
    </motion.div>
  );
};

export default SplitTheBill;
