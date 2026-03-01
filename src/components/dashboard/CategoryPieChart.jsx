import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import useExpenseStore from "../../store/ExpenseStore"


const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#14b8a6"]

const CategoryPieChart = () => {
  const expenses = useExpenseStore((state) => state.expenses)

  // Group by category
  const categoryData = {}

  expenses.forEach((expense) => {
    if (!categoryData[expense.category]) {
      categoryData[expense.category] = 0
    }
    categoryData[expense.category] += expense.amount
  })

  const chartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CategoryPieChart