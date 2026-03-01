import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useExpenseStore from "../../store/ExpenseStore";


const ExpenseTrendChart = () => {
  const expenses = useExpenseStore((state) => state.expenses);

  // Group by month
  const monthlyData = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += expense.amount;
  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    total: monthlyData[month],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis dataKey="month" stroke="#a1a1aa" />
        <YAxis stroke="#a1a1aa" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#ffffff"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseTrendChart;
