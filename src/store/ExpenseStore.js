import { create } from "zustand";
import { persist } from "zustand/middleware";

const useExpenseStore = create(
    persist(
        (set) => ({
            // 🔹 State
            expenses: [],
            budget: 0, // 👈 ADD THIS
            subscriptions: [],

            addSubscription: (subscription) =>
                set((state) => ({
                    subscriptions: [...state.subscriptions, subscription],
                })),

            deleteSubscription: (id) =>
                set((state) => ({
                    subscriptions: state.subscriptions.filter(
                        (s) => s.id !== id,
                    ),
                })),
            // 🔹 Actions
            addExpense: (expense) =>
                set((state) => ({
                    expenses: [...state.expenses, expense],
                })),

            updateExpense: (updatedExpense) =>
                set((state) => ({
                    expenses: state.expenses.map((expense) =>
                        expense.id === updatedExpense.id
                            ? updatedExpense
                            : expense,
                    ),
                })),

            deleteExpense: (id) =>
                set((state) => ({
                    expenses: state.expenses.filter((e) => e.id !== id),
                })),

            setBudget: (
                amount, // 👈 ADD THIS
            ) =>
                set({
                    budget: amount,
                }),
            processSubscriptions: () =>
                set((state) => {
                    const today = new Date();

                    const updatedSubscriptions = state.subscriptions.map(
                        (sub) => {
                            const nextDate = new Date(sub.nextBillingDate);

                            if (today >= nextDate) {
                                // Add expense
                                state.expenses.push({
                                    id: Date.now(),
                                    title: sub.name,
                                    category: "Subscription",
                                    amount: sub.amount,
                                    date: sub.nextBillingDate,
                                });

                                // Move next billing date
                                if (sub.billingCycle === "monthly") {
                                    nextDate.setMonth(nextDate.getMonth() + 1);
                                } else {
                                    nextDate.setFullYear(
                                        nextDate.getFullYear() + 1,
                                    );
                                }

                                return {
                                    ...sub,
                                    nextBillingDate: nextDate
                                        .toISOString()
                                        .split("T")[0],
                                };
                            }

                            return sub;
                        },
                    );

                    return {
                        subscriptions: updatedSubscriptions,
                    };
                }),
            markSubscriptionPaid: (id) =>
                set((state) => {
                    const today = new Date();

                    const updatedSubscriptions = state.subscriptions.map(
                        (sub) => {
                            if (sub.id === id) {
                                const nextDate = new Date(sub.nextBillingDate);

                                // Create expense
                                state.expenses.push({
                                    id: Date.now(),
                                    title: sub.name,
                                    category: "Subscription",
                                    amount: sub.amount,
                                    date: sub.nextBillingDate,
                                });

                                // Move next billing date
                                if (sub.billingCycle === "monthly") {
                                    nextDate.setMonth(nextDate.getMonth() + 1);
                                } else {
                                    nextDate.setFullYear(
                                        nextDate.getFullYear() + 1,
                                    );
                                }

                                return {
                                    ...sub,
                                    nextBillingDate: nextDate
                                        .toISOString()
                                        .split("T")[0],
                                };
                            }

                            return sub;
                        },
                    );

                    return { subscriptions: updatedSubscriptions };
                }),

            cancelSubscription: (id) =>
                set((state) => ({
                    subscriptions: state.subscriptions.filter(
                        (sub) => sub.id !== id,
                    ),
                })),
            theme: "dark",

            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === "dark" ? "light" : "dark",
                })),
        }),
        {
            name: "expense-storage",
        },
    ),
);

export default useExpenseStore;
