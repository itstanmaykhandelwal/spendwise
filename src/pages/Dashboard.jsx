import { useState } from "react"
import StatCard from "../components/dashboard/StatCard"
import ChartCard from "../components/dashboard/ChartCard"
import ExpenseTrendChart from "../components/dashboard/ExpenseTrendChart"
import CategoryPieChart from "../components/dashboard/CategoryPieChart"
import useExpenseStore from "../store/ExpenseStore"

const Dashboard = () => {
  const expenses = useExpenseStore((state) => state.expenses)
  const budget = useExpenseStore((state) => state.budget)
  const setBudget = useExpenseStore((state) => state.setBudget)
  const subscriptions = useExpenseStore((state) => state.subscriptions)
  const markSubscriptionPaid = useExpenseStore(
    (state) => state.markSubscriptionPaid
  )
  const cancelSubscription = useExpenseStore(
    (state) => state.cancelSubscription
  )

  const [showAlert, setShowAlert] = useState(false)

  // 🔹 Total Expenses
  const totalExpenses = expenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  )

  // 🔹 Current Month Expenses
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyExpenses = expenses
    .filter((e) => {
      const date = new Date(e.date)
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      )
    })
    .reduce((acc, curr) => acc + curr.amount, 0)

  const expenseCount = expenses.length

  const averageExpense =
    expenseCount > 0
      ? Math.round(totalExpenses / expenseCount)
      : 0

  // 🔥 Budget
  const budgetPercentage =
    budget > 0
      ? Math.min((monthlyExpenses / budget) * 100, 100)
      : 0

  const remainingBudget =
    budget > 0 ? budget - monthlyExpenses : 0

  const progressColor =
    budgetPercentage >= 100
      ? "bg-red-600"
      : budgetPercentage > 80
      ? "bg-yellow-500"
      : "bg-green-500"

  // 🔔 Upcoming Subscriptions (Next 7 Days)
  const today = new Date()

  const upcomingSubscriptions = subscriptions.filter((sub) => {
    const nextDate = new Date(sub.nextBillingDate)
    const diffTime = nextDate - today
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays >= 0 && diffDays <= 7
  })

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {upcomingSubscriptions.length > 0 && (
          <button
            onClick={() => setShowAlert(true)}
            className="relative bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Upcoming Renewals

            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {upcomingSubscriptions.length}
            </span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Expenses" value={`₹${totalExpenses}`} />
        <StatCard title="This Month" value={`₹${monthlyExpenses}`} />
        <StatCard title="Total Transactions" value={expenseCount} />
        <StatCard title="Average Expense" value={`₹${averageExpense}`} />
      </div>

      {/* Budget */}
      <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-zinc-400 font-medium">
            Monthly Budget
          </h3>

          <div className="flex flex-col items-end gap-2 w-48">
            <span className="text-sm text-zinc-400">
              ₹{budget}
            </span>

            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={budget}
              onChange={(e) =>
                setBudget(Number(e.target.value))
              }
              className="w-full accent-white cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${progressColor}`}
            style={{ width: `${budgetPercentage}%` }}
          />
        </div>

        {budget > 0 ? (
          <div className="flex justify-between text-sm text-zinc-400">
            <span>Spent: ₹{monthlyExpenses}</span>
            <span>
              Remaining: ₹{remainingBudget > 0 ? remainingBudget : 0}
            </span>
          </div>
        ) : (
          <div className="text-sm text-zinc-500">
            Adjust slider to set monthly budget
          </div>
        )}

        {budget > 0 && monthlyExpenses > budget && (
          <div className="text-red-500 text-sm font-semibold">
            ⚠ You are over your monthly budget!
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard title="Expense Trend">
          <ExpenseTrendChart />
        </ChartCard>

        <ChartCard title="Category Breakdown">
          <CategoryPieChart />
        </ChartCard>
      </div>

      {/* 🔔 Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-md space-y-4">

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-yellow-400">
                Upcoming Renewals
              </h3>

              <button
                onClick={() => setShowAlert(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {upcomingSubscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-zinc-800 p-4 rounded-lg space-y-3"
              >
                <div className="flex justify-between text-sm">
                  <span>{sub.name}</span>
                  <span>₹{sub.amount}</span>
                </div>

                <div className="text-xs text-zinc-400">
                  Next Billing: {sub.nextBillingDate}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => markSubscriptionPaid(sub.id)}
                    className="flex-1 bg-green-600 text-white text-sm py-1 rounded-lg"
                  >
                    Mark as Paid
                  </button>

                  <button
                    onClick={() => cancelSubscription(sub.id)}
                    className="flex-1 bg-red-600 text-white text-sm py-1 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard