import { filterOptions } from "@/config";
import React from "react";
import { Label } from "../ui/label";

export default function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="w-full md:w-72 bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-6">
      {/* Title */}
      <div className="border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
      </div>

      {/* Filter Sections */}
      <div className="space-y-5">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem} className="space-y-3">
            {/* Section Heading */}
            <h3 className="text-lg font-medium text-gray-700 capitalize">
              {keyItem}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {filterOptions[keyItem].map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-yellow-600 transition"
                >
                  <input
                    type="checkbox"
                    checked={
                      filters[keyItem]
                        ? filters[keyItem].includes(option.id)
                        : false
                    }
                    className="w-4 h-4 rounded border-gray-400 text-yellow-600 focus:ring-yellow-500"
                    onChange={() => handleFilter(keyItem, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
