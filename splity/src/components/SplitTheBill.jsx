import React, { useEffect, useState } from "react";

const SplitTheBill = ({ data }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!data) return;

    const tr = data;
    let sum = 0;
    for (const key in tr) {
      sum += tr[key];
    }

    const perShare = sum / Object.keys(tr).length;

    const debtors = [];
    const creditors = [];

    for (const key in tr) {
      const amt = tr[key];
      if (amt > perShare) {
        creditors.push({ name: key, amount: +(amt - perShare).toFixed(2) });
      } else if (amt < perShare) {
        debtors.push({ name: key, amount: +(perShare - amt).toFixed(2) });
      }
    }

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const result = [];

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const d = debtors[i];
      const c = creditors[j];

      if (d.amount <= c.amount) {
        result.push(`${d.name} pays ₹${d.amount.toFixed(2)} to ${c.name}`);
        creditors[j].amount -= d.amount;
        i++;
      } else {
        result.push(`${d.name} pays ₹${c.amount.toFixed(2)} to ${c.name}`);
        debtors[i].amount -= c.amount;
        j++;
      }
    }

    setTransactions(result);
  }, [data]);

  return (
    <div className="p-6 bg-gray-100 mt-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction Summary</h2>
        <div className="flex justify-center">
      {transactions.length > 0 ? (
        <ul className="list-disc ml-6">
          {transactions.map((t, index) => (
            <li key={index}>{t}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No transactions to display.</p>
      )}
      </div>
    </div>
  );
};

export default SplitTheBill;
