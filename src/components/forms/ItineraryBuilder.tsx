"use client";
import { Plus, X, GripVertical } from "lucide-react";

interface ItineraryDay {
  day: string;
  title: string;
  description: string;
}

interface Props {
  itinerary: ItineraryDay[];
  onChange: (itinerary: ItineraryDay[]) => void;
}

export default function ItineraryBuilder({ itinerary = [], onChange }: Props) {
  
  const handleAdd = () => {
    onChange([...itinerary, { day: `Day ${itinerary.length + 1}`, title: "", description: "" }]);
  };

  const handleRemove = (index: number) => {
    const newList = [...itinerary];
    newList.splice(index, 1);
    onChange(newList);
  };

  const handleChange = (index: number, field: keyof ItineraryDay, value: string) => {
    const newList = [...itinerary];
    newList[index] = { ...newList[index], [field]: value };
    onChange(newList);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-[var(--panel-border)]">
        <h3 className="font-semibold">Itinerary Schedule</h3>
        <button type="button" onClick={handleAdd} className="btn btn-secondary py-1.5 px-3 text-xs border-dashed">
          <Plus size={14} /> Add Day
        </button>
      </div>

      {itinerary.length === 0 ? (
        <div className="text-center py-6 bg-gray-50/50 rounded-lg border border-dashed border-[var(--panel-border)]">
          <p className="text-sm text-[var(--text-secondary)]">No itinerary days added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {itinerary.map((day, index) => (
            <div key={index} className="flex gap-3 p-4 bg-white border border-[var(--panel-border)] rounded-xl shadow-sm">
              <div className="pt-2 text-[var(--text-secondary)] cursor-grab shrink-0">
                <GripVertical size={20} />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex gap-3">
                  <div className="w-1/4">
                    <input 
                      type="text" 
                      value={day.day} 
                      onChange={(e) => handleChange(index, "day", e.target.value)}
                      placeholder="e.g. Day 1" 
                      className="form-input py-1.5 text-sm font-medium" 
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={day.title} 
                      onChange={(e) => handleChange(index, "title", e.target.value)}
                      placeholder="Day title e.g. Arrival in Colombo" 
                      className="form-input py-1.5 text-sm font-semibold" 
                    />
                  </div>
                </div>
                <div>
                  <textarea 
                    value={day.description} 
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    placeholder="Describe the day's activities..." 
                    className="form-input h-24 text-sm" 
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="self-start p-2 mt-1 text-[var(--danger)] hover:bg-[var(--danger-bg)] rounded-md transition-colors"
                title="Remove Day"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
