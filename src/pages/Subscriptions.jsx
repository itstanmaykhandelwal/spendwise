import { Plus } from "lucide-react";
import { useState } from "react";
import useExpenseStore from "../store/ExpenseStore";
import AddSubscriptionModal from "../components/subscriptions/AddSubscriptionModal";

const Subscriptions = () => {
    const subscriptions = useExpenseStore((state) => state.subscriptions);
    const deleteSubscription = useExpenseStore(
        (state) => state.deleteSubscription,
    );
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Subscriptions</h1>

                <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium">
                    <Plus size={18} />
                    Add Subscription
                </button>
            </div>

            {subscriptions.length === 0 ? (
                <div className="bg-zinc-900 p-8 rounded-xl text-center text-zinc-500">
                    No subscriptions added yet.
                </div>
            ) : (
                <div className="bg-zinc-900 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-800 text-zinc-400 text-sm">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Billing</th>
                                <th className="p-4">Next Billing</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {subscriptions.map((sub) => (
                                <tr
                                    key={sub.id}
                                    className="border-t border-zinc-800"
                                >
                                    <td className="p-4">{sub.name}</td>
                                    <td className="p-4">₹{sub.amount}</td>
                                    <td className="p-4 capitalize">
                                        {sub.billingCycle}
                                    </td>
                                    <td className="p-4">
                                        {sub.nextBillingDate}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() =>
                                                deleteSubscription(sub.id)
                                            }
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <AddSubscriptionModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
        </div>
        
    );
};

export default Subscriptions;
