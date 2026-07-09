"use client";
import { Plus, X } from "lucide-react";

interface Props {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function DynamicStringList({ label, items = [], onChange, placeholder = "Add item..." }: Props) {
  
  const handleAdd = () => {
    onChange([...items, ""]);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="form-group border border-[var(--panel-border)] p-4 rounded-xl bg-gray-50/50">
      <div className="flex justify-between items-center mb-3">
        <label className="form-label mb-0">{label}</label>
        <button type="button" onClick={handleAdd} className="text-xs flex items-center gap-1 text-[var(--accent)] font-medium hover:text-[var(--accent-hover)] transition-colors">
          <Plus size={14} /> Add New
        </button>
      </div>
      
      {items.length === 0 ? (
        <p className="text-xs text-[var(--text-secondary)] italic">No items added yet. Click "Add New" to begin.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={placeholder}
                className="form-input py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-2 text-[var(--danger)] hover:bg-[var(--danger-bg)] rounded-md transition-colors shrink-0"
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
