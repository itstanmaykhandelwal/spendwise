import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import AppLayout from "./layouts/AppLayout";
import "./App.css";
import useExpenseStore from "./store/ExpenseStore";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const Analytics = lazy(() => import("./pages/Analytics"));

const App = () => {
    const processSubscriptions = useExpenseStore(
        (state) => state.processSubscriptions,
    );

    useEffect(() => {
        processSubscriptions();
    }, [processSubscriptions]);

    return (
        <AppLayout>
            <Suspense
                fallback={
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </Suspense>
        </AppLayout>
    );
};

export default App;
