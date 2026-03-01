import React from "react";

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg flex flex-col">
      
      <h3 className="text-zinc-400 mb-4 text-sm font-medium">
        {title}
      </h3>

      {/* Important: fixed height wrapper */}
      <div className="flex-1 min-h-[250px]">
        {children}
      </div>

    </div>
  )
}

export default ChartCard
