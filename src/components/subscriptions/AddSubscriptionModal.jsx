import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import useExpenseStore from "../../store/ExpenseStore";

const AddSubscriptionModal = ({ isOpen, onClose }) => {
    const addSubscription = useExpenseStore((state) => state.addSubscription);

    const { register, handleSubmit, reset } = useForm();

    const calculateNextBillingDate = (startDate, billingCycle) => {
        const date = new Date(startDate);

        if (billingCycle === "monthly") {
            date.setMonth(date.getMonth() + 1);
        } else {
            date.setFullYear(date.getFullYear() + 1);
        }

        return date.toISOString().split("T")[0];
    };

    const onSubmit = (data) => {
        const nextBillingDate = calculateNextBillingDate(
            data.startDate,
            data.billingCycle,
        );

        addSubscription({
            id: Date.now(),
            name: data.name,
            amount: Number(data.amount),
            billingCycle: data.billingCycle,
            startDate: data.startDate,
            nextBillingDate,
        });

        reset();
        onClose();
    };

    // 🔥 ESC Close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

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
                            Add Subscription
                        </h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Name */}
                            <input
                                {...register("name")}
                                placeholder="Subscription Name"
                                className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                            />

                            {/* Amount */}
                            <input
                                type="number"
                                {...register("amount")}
                                placeholder="Amount"
                                className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                            />

                            {/* Billing Cycle */}
                            <select
                                {...register("billingCycle")}
                                className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>

                            {/* Start Date */}
                            <input
                                type="date"
                                {...register("startDate")}
                                className="w-full bg-zinc-800 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
                            />

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
                                    Add
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddSubscriptionModal;
