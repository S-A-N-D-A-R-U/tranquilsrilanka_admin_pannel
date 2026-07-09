"use client";
import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface Props {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ label, tags = [], onChange, placeholder = "Type and press enter..." }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="form-group w-full">
      <label className="form-label">{label}</label>
      <div className="flex flex-wrap gap-2 p-2 border border-[var(--panel-border)] rounded-lg bg-white min-h-[42px] focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition-all">
        {tags.map((tag, index) => (
          <span key={index} className="flex items-center gap-1 bg-blue-50 text-[var(--accent)] text-sm px-2.5 py-1 rounded-md border border-blue-100">
            {tag}
            <button type="button" onClick={() => removeTag(index)} className="hover:text-blue-900 transition-colors">
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] outline-none text-sm bg-transparent border-none focus:ring-0 p-0"
        />
      </div>
      <p className="text-[11px] text-[var(--text-secondary)] mt-1">Type and press Enter or comma to add</p>
    </div>
  );
}
