import useExpenseStore from "../store/ExpenseStore";
import { useMemo } from "react";
import { Download } from "lucide-react";

const Analytics = () => {
    const expenses = useExpenseStore((state) => state.expenses);
    const subscriptions = useExpenseStore((state) => state.subscriptions);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentMonth - 1);

    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    // 🔥 Monthly Expenses
    const currentMonthTotal = useMemo(() => {
        return expenses
            .filter((e) => {
                const date = new Date(e.date);
                return (
                    date.getMonth() === currentMonth &&
                    date.getFullYear() === currentYear
                );
            })
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [expenses]);

    const lastMonthTotal = useMemo(() => {
        return expenses
            .filter((e) => {
                const date = new Date(e.date);
                return (
                    date.getMonth() === lastMonth &&
                    date.getFullYear() === lastMonthYear
                );
            })
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [expenses]);

    const percentageChange =
        lastMonthTotal > 0
            ? (
                  ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) *
                  100
              ).toFixed(1)
            : 0;

    // 🔥 Top Category
    const topCategory = useMemo(() => {
        const categoryMap = {};

        expenses.forEach((e) => {
            if (!categoryMap[e.category]) {
                categoryMap[e.category] = 0;
            }
            categoryMap[e.category] += e.amount;
        });

        return Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
    }, [expenses]);

    // 🔥 Monthly Subscription Impact
    const monthlySubscriptionCost = useMemo(() => {
        return subscriptions
            .filter((s) => s.billingCycle === "monthly")
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [subscriptions]);

    // 🔥 Export CSV
    const exportCSV = () => {
        const headers = ["Title", "Category", "Amount", "Date"];

        const rows = expenses.map((e) => [
            e.title,
            e.category,
            e.amount,
            e.date,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map((row) => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "expenses.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Analytics</h1>

            {/* Monthly Comparison */}
            <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-3">
                <h3 className="text-lg font-semibold">Monthly Comparison</h3>

                <p>Current Month: ₹{currentMonthTotal}</p>
                <p>Last Month: ₹{lastMonthTotal}</p>

                <p
                    className={
                        percentageChange >= 0
                            ? "text-red-500"
                            : "text-green-500"
                    }
                >
                    {percentageChange}% change
                </p>
            </div>

            {/* Top Category */}
            {topCategory && (
                <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-lg font-semibold">
                        Top Spending Category
                    </h3>

                    <p>
                        {topCategory[0]} – ₹{topCategory[1]}
                    </p>
                </div>
            )}

            {/* Subscription Impact */}
            <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                <h3 className="text-lg font-semibold">
                    Monthly Subscription Cost
                </h3>

                <p>₹{monthlySubscriptionCost}</p>
            </div>

            {/* Export */}
            <button
                onClick={exportCSV}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg"
            >
                <Download size={16} />
                Export Expenses CSV
            </button>
        </div>
    );
};

export default Analytics;
