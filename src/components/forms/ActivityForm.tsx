"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import DynamicStringList from "./DynamicStringList";
import { saveActivity } from "@/app/actions/activityActions";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ActivityForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: "",
    slug: "",
    category: "Culture",
    price: 0,
    duration: "",
    destination: "",
    image: "",
    shortDescription: "",
    description: "",
    isOfferAvailable: false,
    offerPrice: 0,
    isPopular: false,
    highlights: [],
    whatToBring: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : (type === "number" ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveActivity(formData, initialData?._id);
      router.push("/activities");
    } catch (error) {
      console.error(error);
      alert("Failed to save activity");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="flex justify-between items-center mb-6 sticky top-20 bg-[var(--bg-color)] z-10 py-4 border-b border-[var(--panel-border)]">
        <Link href="/activities" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <button type="submit" className="btn btn-primary shadow-lg" disabled={loading}>
          <Save size={16} /> {loading ? "Saving..." : (initialData ? "Update Activity" : "Save Activity")}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel space-y-4">
            <h2 className="text-xl border-b border-[var(--panel-border)] pb-3 mb-4">Basic Information</h2>
            
            <div className="form-group">
              <label className="form-label">Activity Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="form-input" placeholder="e.g. Minneriya Elephant Safari" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="form-input" placeholder="e.g. minneriya-safari" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="form-input">
                  <option value="Wildlife">Wildlife</option>
                  <option value="Culture">Culture</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Nature">Nature</option>
                  <option value="Wellness">Wellness</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Destination</label>
                <input type="text" name="destination" value={formData.destination} onChange={handleChange} required className="form-input" placeholder="e.g. Minneriya" />
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className="form-input" placeholder="e.g. 3 Hours" />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Short Description</label>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required className="form-input h-20" placeholder="A brief summary..."></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Full Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required className="form-input h-32" placeholder="Detailed description..."></textarea>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel">
              <DynamicStringList 
                label="Highlights" 
                items={formData.highlights} 
                onChange={(items) => setFormData((prev: any) => ({ ...prev, highlights: items }))} 
                placeholder="e.g. See 200+ wild elephants"
              />
            </div>
            <div className="glass-panel">
              <DynamicStringList 
                label="What to Bring" 
                items={formData.whatToBring} 
                onChange={(items) => setFormData((prev: any) => ({ ...prev, whatToBring: items }))} 
                placeholder="e.g. Sunscreen, Hat, Camera"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel">
            <h2 className="text-xl border-b border-[var(--panel-border)] pb-3 mb-4">Media</h2>
            <ImageUpload 
              value={formData.image} 
              onChange={(url) => setFormData((prev: any) => ({ ...prev, image: url }))} 
            />
          </div>

          <div className="glass-panel space-y-4">
            <h2 className="text-xl border-b border-[var(--panel-border)] pb-3 mb-4">Pricing & Display</h2>
            
            <div className="form-group">
              <label className="form-label">Price (USD)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="form-input" />
            </div>

            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-4">
              <div className="form-group flex items-center gap-3 mb-0">
                <input type="checkbox" id="isOfferAvailable" name="isOfferAvailable" checked={formData.isOfferAvailable} onChange={handleChange} className="w-4 h-4 rounded" />
                <label htmlFor="isOfferAvailable" className="font-semibold text-blue-900">Enable Special Offer</label>
              </div>
              
              {formData.isOfferAvailable && (
                <div className="form-group mb-0">
                  <label className="form-label text-blue-800">Offer Price (USD)</label>
                  <input type="number" name="offerPrice" value={formData.offerPrice} onChange={handleChange} className="form-input bg-white border-blue-200" />
                </div>
              )}
            </div>

            <div className="form-group flex items-center gap-3 mt-4 pt-4 border-t border-[var(--panel-border)]">
              <input type="checkbox" id="isPopular" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-4 h-4 rounded" />
              <label htmlFor="isPopular" className="text-sm font-medium">Feature in "Popular Activities" section</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
