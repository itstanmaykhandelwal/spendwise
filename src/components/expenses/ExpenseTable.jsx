import { Pencil, Trash2 } from "lucide-react";
import useExpenseStore from "../../store/ExpenseStore";

const ExpenseTable = ({ expenses, onEdit }) => {
    const deleteExpense = useExpenseStore((state) => state.deleteExpense);
    if (!expenses || expenses.length === 0) {
        return (
            <div className="bg-zinc-900 rounded-xl p-10 text-center text-zinc-500">
                No Data Available
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="w-full text-left">
                    <thead className="bg-zinc-800 text-zinc-400 text-sm">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) => (
                            <tr
                                key={expense.id}
                                className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                            >
                                <td className="p-4">{expense.title}</td>
                                <td className="p-4">{expense.category}</td>
                                <td className="p-4 font-medium">
                                    ₹{expense.amount}
                                </td>
                                <td className="p-4">{expense.date}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => onEdit(expense)}
                                        className="mr-3 text-zinc-400 hover:text-white"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteExpense(expense.id)
                                        }
                                        className="text-zinc-400 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 p-4">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="bg-zinc-800 p-4 rounded-lg space-y-2"
                    >
                        <div className="flex justify-between">
                            <span className="font-medium">{expense.title}</span>
                            <span className="font-semibold">
                                ₹{expense.amount}
                            </span>
                        </div>

                        <div className="text-sm text-zinc-400">
                            {expense.category} • {expense.date}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button className="text-zinc-400 hover:text-white">
                                <Pencil size={16} />
                            </button>
                            <button
                                onClick={() => deleteExpense(expense.id)}
                                className="text-zinc-400 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseTable;
