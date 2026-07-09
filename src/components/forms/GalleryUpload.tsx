"use client";
import { useState, useRef } from "react";
import { UploadCloud, Loader2, X, Plus } from "lucide-react";
import { uploadImage } from "@/app/actions/uploadAction";

interface Props {
  images: string[];
  onChange: (urls: string[]) => void;
}

export default function GalleryUpload({ images = [], onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    // We'll upload sequentially for simplicity, could be parallelized
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      
      const result = await uploadImage(formData);
      if ("url" in result) {
        newUrls.push(result.url);
      }
    }
    
    onChange([...images, ...newUrls]);
    setIsUploading(false);
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden aspect-video border border-[var(--panel-border)] group bg-black/5">
            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
        
        <div 
          className="upload-area aspect-video flex flex-col items-center justify-center gap-2 p-0 h-auto cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? (
            <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
          ) : (
            <Plus className="text-[var(--text-secondary)]" size={24} />
          )}
          <span className="text-xs text-[var(--text-secondary)] font-medium">Add Image</span>
        </div>
      </div>
      
      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleUpload} 
        accept="image/*" 
        multiple
        className="hidden" 
      />
    </div>
  );
}
