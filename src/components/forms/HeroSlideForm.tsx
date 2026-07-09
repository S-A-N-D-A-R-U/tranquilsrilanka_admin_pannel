"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { saveHeroSlide } from "@/app/actions/heroSlideActions";

export default function HeroSlideForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    url: initialData?.url || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    tagline: initialData?.tagline || "",
    order: initialData?.order || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "order" ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) return alert("Please upload an image");
    
    setIsSubmitting(true);
    try {
      await saveHeroSlide(formData, initialData?._id);
      router.push("/hero-slides");
    } catch (error) {
      console.error(error);
      alert("Failed to save slide");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="panel">
        <h2 className="panel-title mb-6">Slide Information</h2>
        
        <div className="grid grid-cols-1 gap-6">
          <ImageUpload 
            value={formData.url} 
            onChange={(url) => setFormData(p => ({ ...p, url }))} 
            label="Slide Image" 
          />

          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tagline</label>
            <input 
              type="text" 
              name="tagline" 
              value={formData.tagline} 
              onChange={handleChange} 
              className="form-control" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="form-control h-24" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Display Order</label>
            <input 
              type="number" 
              name="order" 
              value={formData.order} 
              onChange={handleChange} 
              className="form-control" 
            />
            <p className="form-help">Lower numbers appear first.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="btn btn-secondary" disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Slide"}
        </button>
      </div>
    </form>
  );
}
