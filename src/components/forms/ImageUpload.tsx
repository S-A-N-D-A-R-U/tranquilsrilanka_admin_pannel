"use client";
import { useState, useRef } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import { uploadImage } from "@/app/actions/uploadAction";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Cover Image" }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);
    if ("url" in result) {
      onChange(result.url);
    } else {
      alert(result.error);
    }
    setIsUploading(false);
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {value ? (
        <div className="relative rounded-xl overflow-hidden h-48 border border-[var(--panel-border)] group">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange("")}
              className="btn btn-danger"
            >
              <X size={16} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="upload-area flex flex-col items-center justify-center gap-3"
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? (
            <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
          ) : (
            <UploadCloud className="text-[var(--text-secondary)]" size={32} />
          )}
          <p className="text-sm text-[var(--text-secondary)]">
            {isUploading ? "Uploading to Cloudinary..." : "Click to upload an image"}
          </p>
          <input 
            type="file" 
            ref={inputRef} 
            onChange={handleUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      )}
    </div>
  );
}
