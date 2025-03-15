import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  Filter
} from 'lucide-react';

interface BudgetItem {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

function App() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    };

    setItems([newItem, ...items]);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Budget Manager</h1>
          <p className="mt-1 text-sm text-gray-500">Track your project finances</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="stat-card before:from-green-50 before:to-transparent">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Total Income</h2>
                <ArrowUpCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-green-600">
                ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-sm text-gray-500">All time earnings</p>
            </div>
          </div>

          <div className="stat-card before:from-red-50 before:to-transparent">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Total Expenses</h2>
                <ArrowDownCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-red-600">
                ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-sm text-gray-500">All time spending</p>
            </div>
          </div>

          <div className="stat-card before:from-blue-50 before:to-transparent">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Net Balance</h2>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <p className={`mt-2 text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ${Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {balance >= 0 ? 'Current savings' : 'Current deficit'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="card lg:col-span-2">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">New Transaction</h2>
              <p className="mt-1 text-sm text-gray-500">Add a new income or expense entry</p>
              
              <form onSubmit={addItem} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                    className="input-field"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-field"
                    placeholder="Enter category"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </button>
              </form>
            </div>
          </div>

          <div className="card lg:col-span-3">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredItems.length} transaction{filteredItems.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10 pr-4"
                  />
                </div>
                <button className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${
                          item.type === 'income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          ${item.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                        No transactions found. Add a new transaction to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;