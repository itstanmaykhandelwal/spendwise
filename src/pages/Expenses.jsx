import { Plus } from "lucide-react";
import ExpenseTable from "../components/expenses/ExpenseTable";
import { useEffect, useState } from "react";
import AddExpenseModal from "../components/expenses/AddExpenseModal";
import useDebounce from "../hooks/useDebounce";
import useExpenseStore from "../store/ExpenseStore";

const Expenses = () => {
    const expenses = useExpenseStore((state) => state.expenses);

    //  Search
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);

    //  Category
    const [category, setCategory] = useState("All");

    //  Edit
    const [editData, setEditData] = useState(null);

    // Modal
    const [isOpen, setIsOpen] = useState(false);

    //  Filtering
    const filteredExpenses = expenses.filter((expense) => {
        const matchesSearch = expense.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());

        const matchesCategory =
            category === "All" || expense.category === category;

        return matchesSearch && matchesCategory;
    });

    //  Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedExpenses = filteredExpenses.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, category]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Expenses</h1>

                <button
                    onClick={() => {
                        setEditData(null);
                        setIsOpen(true);
                    }}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                    <Plus size={18} />
                    Add Expense
                </button>
            </div>

            {/* Filters */}
            <div className="bg-zinc-900 p-4 rounded-xl flex flex-col md:flex-row gap-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search expenses..."
                    className="flex-1 bg-zinc-800 p-2 rounded-lg outline-none"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-zinc-800 p-2 rounded-lg outline-none"
                >
                    <option value="All">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            {/* Expense Table (EDIT FIXED HERE) */}
            <ExpenseTable
                expenses={paginatedExpenses}
                onEdit={(expense) => {
                    setEditData(expense);
                    setIsOpen(true);
                }}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-lg ${
                                currentPage === i + 1
                                    ? "bg-white text-black"
                                    : "bg-zinc-800 text-zinc-400"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AddExpenseModal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setEditData(null);
                }}
                editData={editData}
            />
        </div>
    );
};

export default Expenses;
