import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import useExpenseStore from "../../store/ExpenseStore"

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category required"),
  date: z.string().min(1, "Date required"),
})

const AddExpenseModal = ({ isOpen, onClose, editData }) => {
  const addExpense = useExpenseStore((state) => state.addExpense)
  const updateExpense = useExpenseStore((state) => state.updateExpense)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  // 🔥 Prefill when editing
  useEffect(() => {
    if (editData) {
      setValue("title", editData.title)
      setValue("amount", editData.amount)
      setValue("category", editData.category)
      setValue("date", editData.date)
    } else {
      reset()
    }
  }, [editData, setValue, reset])

  // 🔥 Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
    }
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  const onSubmit = (data) => {
    if (editData) {
      updateExpense({ ...editData, ...data })
    } else {
      addExpense({
        id: Date.now(),
        ...data,
      })
    }

    reset()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md space-y-5 border border-zinc-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold">
              {editData ? "Edit Expense" : "Add Expense"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Title */}
              <div>
                <input
                  {...register("title")}
                  placeholder="Title"
                  className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <input
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                  placeholder="Amount"
                  className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <select
                  {...register("category")}
                  className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                >
                  <option value="">Select Category</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <input
                  type="date"
                  {...register("date")}
                  className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-zinc-700 rounded-xl transition hover:bg-zinc-600 active:scale-95"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black rounded-xl font-medium transition hover:scale-105 active:scale-95"
                >
                  {editData ? "Update" : "Add"}
                </button>
              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddExpenseModal