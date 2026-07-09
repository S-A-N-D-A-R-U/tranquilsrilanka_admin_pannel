"use client";
import { Plus, X } from "lucide-react";

interface Props {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export default function DynamicStringList({ label, items = [], onChange, placeholder = "Add item...", suggestions = [] }: Props) {
  
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

  const handleAddSuggestion = (suggestion: string) => {
    if (!items.includes(suggestion)) {
      // If there's an empty item at the end, replace it, otherwise append
      const lastItem = items[items.length - 1];
      if (items.length > 0 && lastItem === "") {
        const newItems = [...items];
        newItems[newItems.length - 1] = suggestion;
        onChange(newItems);
      } else {
        onChange([...items, suggestion]);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText.includes("\n") || pastedText.includes(",")) {
      e.preventDefault();
      // Split by newline or comma
      const delimiter = pastedText.includes("\n") ? "\n" : ",";
      const lines = pastedText
        .split(delimiter)
        .map(line => line.replace(/^[\s\-\*\•]+/, "").trim()) // Remove common bullet points and whitespace
        .filter(Boolean);
      
      if (lines.length > 0) {
        const newItems = [...items];
        // If pasting into an empty input, replace it. Otherwise append.
        if (newItems[index] === "") {
          newItems.splice(index, 1, ...lines);
        } else {
          newItems.splice(index + 1, 0, ...lines);
        }
        // Deduplicate
        const uniqueItems = Array.from(new Set(newItems));
        onChange(uniqueItems);
      }
    }
  };

  return (
    <div className="form-group border border-[var(--panel-border)] p-4 rounded-xl bg-gray-50/50">
      <div className="flex justify-between items-center mb-3">
        <label className="form-label mb-0">{label}</label>
        <button type="button" onClick={handleAdd} className="text-xs flex items-center gap-1 text-[var(--accent)] font-medium hover:text-[var(--accent-hover)] transition-colors">
          <Plus size={14} /> Add New
        </button>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="mb-4">
          <p className="text-[11px] text-[var(--text-secondary)] mb-2">Quick Add:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddSuggestion(sug)}
                disabled={items.includes(sug)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors
                  ${items.includes(sug) 
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'bg-white text-[var(--text-primary)] border-[var(--panel-border)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-sm'
                  }`}
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {items.length === 0 ? (
        <div className="mt-2 p-3 border border-dashed border-[var(--panel-border)] rounded-lg text-center bg-white/50">
          <p className="text-xs text-[var(--text-secondary)]">No items added yet.</p>
          <p className="text-[11px] text-[var(--accent)] mt-1 font-medium">Tip: Click "Add New" and paste a full list to add them all at once!</p>
        </div>
      ) : (
        <div className="space-y-2 mt-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={(e) => handlePaste(e, index)}
                placeholder={placeholder}
                className="form-input py-1.5 text-sm bg-white"
                title="You can paste a list here to add multiple items at once!"
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
