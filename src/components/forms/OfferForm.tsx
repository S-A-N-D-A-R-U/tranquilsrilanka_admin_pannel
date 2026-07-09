"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { createOffer, updateOffer } from "@/app/actions/offerActions";
import { Save, ArrowLeft, Info, ImageIcon, Tag } from "lucide-react";
import Link from "next/link";

export default function OfferForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    image: "",
    discountBadge: "",
    validityText: "",
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?._id) {
        await updateOffer(initialData._id, formData);
      } else {
        await createOffer(formData);
      }
      router.push("/offers");
    } catch (error) {
      console.error(error);
      alert("Failed to save offer");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      {/* Header Sticky Bar */}
      <div className="flex justify-between items-center mb-6 sticky top-20 bg-[var(--bg-color)]/95 backdrop-blur-md z-20 py-4 border-b border-[var(--panel-border)] rounded-b-xl px-2">
        <Link href="/offers" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <button type="submit" className="btn btn-primary shadow-lg" disabled={loading}>
          <Save size={16} /> {loading ? "Saving..." : (initialData ? "Update Offer" : "Save Offer")}
        </button>
      </div>

      <div className="glass-panel p-6 md:p-8 shadow-sm">
        <div className="space-y-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group md:col-span-2">
              <label className="form-label">Offer Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="form-input text-lg font-medium" placeholder="e.g. Summer Special — 15% Off Round Tours" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Slug (URL snippet)</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="form-input" placeholder="e.g. summer-special" />
            </div>
            
            <div className="form-group flex items-center gap-3">
              <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded border-[var(--panel-border)] text-[var(--accent)] focus:ring-[var(--accent)] cursor-pointer" />
              <label htmlFor="isActive" className="font-semibold cursor-pointer text-[var(--text-primary)]">Offer is Active</label>
            </div>
          </div>

          <div className="form-group pt-4 border-t border-[var(--panel-border)]">
            <label className="form-label">Short Description (For Cards)</label>
            <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required className="form-input h-20 resize-y" placeholder="Brief description..."></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Full Description (For Detail Page)</label>
            <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} required className="form-input h-40 resize-y" placeholder="Detailed description of the offer..."></textarea>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[var(--panel-border)]">
            <div className="form-group">
              <label className="form-label">Discount Badge Text</label>
              <input type="text" name="discountBadge" value={formData.discountBadge} onChange={handleChange} required className="form-input" placeholder="e.g. 15% OFF" />
            </div>
            <div className="form-group">
              <label className="form-label">Validity Text</label>
              <input type="text" name="validityText" value={formData.validityText} onChange={handleChange} required className="form-input" placeholder="e.g. Valid until August 31, 2026" />
            </div>
          </div>

          <div className="bg-gray-50/50 p-6 rounded-xl border border-[var(--panel-border)] mt-6">
            <ImageUpload 
              label="Offer Banner Image (Required)"
              value={formData.image} 
              onChange={(url) => setFormData((prev: any) => ({ ...prev, image: url }))} 
            />
          </div>
        </div>
      </div>
    </form>
  );
}
