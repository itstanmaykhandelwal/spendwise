import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StatCard = ({ title, value }) => {
    const numericValue =
        typeof value === "string" ? Number(value.replace(/[^\d]/g, "")) : value;

    const prefix = typeof value === "string" && value.includes("₹") ? "₹" : "";

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 800;
        const increment = numericValue / (duration / 16);

        const counter = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
                start = numericValue;
                clearInterval(counter);
            }
            setDisplayValue(Math.floor(start));
        }, 16);

        return () => clearInterval(counter);
    }, [numericValue]);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
            <p className="text-sm text-zinc-400">{title}</p>
            <h3 className="text-2xl font-bold mt-2">
                {prefix}
                {displayValue}
            </h3>
        </motion.div>
    );
};

export default StatCard;
