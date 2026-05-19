import { useState } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi = monthlyRate > 0
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : principal / months;
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;

  const formatCurrency = (n: number) => {
    if (n >= 10000000) return `${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `${(n / 100000).toFixed(2)} Lac`;
    return n.toLocaleString('en-IN');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-gray-900">EMI Calculator</h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Loan Amount</span>
            <span className="font-semibold text-gray-900 flex items-center">
              <IndianRupee className="w-3.5 h-3.5" />{formatCurrency(principal)}
            </span>
          </label>
          <input
            type="range"
            min={100000}
            max={50000000}
            step={100000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 Lac</span><span>5 Cr</span>
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Interest Rate</span>
            <span className="font-semibold text-gray-900">{rate}%</span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={0.25}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1%</span><span>20%</span>
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Loan Tenure</span>
            <span className="font-semibold text-gray-900">{tenure} Years</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 Yr</span><span>30 Yrs</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
        <div className="text-center mb-3">
          <p className="text-sm text-gray-600">Monthly EMI</p>
          <p className="text-2xl font-bold text-emerald-700 flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
            {Math.round(emi).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Principal</p>
            <p className="text-sm font-semibold text-gray-700">{formatCurrency(principal)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Interest</p>
            <p className="text-sm font-semibold text-gray-700">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex rounded-full overflow-hidden h-2">
            <div
              className="bg-emerald-600"
              style={{ width: `${(principal / totalAmount) * 100}%` }}
            />
            <div
              className="bg-amber-400"
              style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-emerald-600">Principal ({Math.round((principal / totalAmount) * 100)}%)</span>
            <span className="text-amber-500">Interest ({Math.round((totalInterest / totalAmount) * 100)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
