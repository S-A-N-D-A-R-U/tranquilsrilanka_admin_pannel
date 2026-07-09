"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import GalleryUpload from "./GalleryUpload";
import DynamicStringList from "./DynamicStringList";
import ItineraryBuilder from "./ItineraryBuilder";
import { saveTour } from "@/app/actions/tourActions";
import { Save, ArrowLeft, Info, List, Map, Image as ImageIcon, Tag } from "lucide-react";
import Link from "next/link";
import TagInput from "./TagInput";

export default function TourForm({ initialData = null, availableOffers = [] }: { initialData?: any, availableOffers?: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(initialData || {
    title: "",
    slug: "",
    type: "round",
    price: 0,
    originalPrice: 0,
    linkedOffers: [],
    isOfferAvailable: false,
    offerPercentage: 0,
    duration: "",
    image: "",
    gallery: [],
    overview: "",
    isPopular: false,
    rating: 0,
    reviews: 0,
    destinations: [],
    categories: [],
    highlights: [],
    inclusions: [],
    exclusions: [],
    itinerary: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : (type === "number" ? Number(value) : value),
    }));
  };

  const handleCommaList = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
    setFormData((prev: any) => ({ ...prev, [field]: arr }));
  };

  const handleOfferToggle = (offerId: string) => {
    setFormData((prev: any) => {
      const isSelected = prev.linkedOffers.includes(offerId);
      return {
        ...prev,
        linkedOffers: isSelected 
          ? prev.linkedOffers.filter((id: string) => id !== offerId)
          : [...prev.linkedOffers, offerId]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveTour(formData, initialData?._id);
      router.push("/tours");
    } catch (error) {
      console.error(error);
      alert("Failed to save tour");
    }
    setLoading(false);
  };

  const tabs = [
    { id: "general", label: "General Info", icon: Info },
    { id: "features", label: "Features", icon: List },
    { id: "itinerary", label: "Itinerary", icon: Map },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "pricing", label: "Pricing & Promo", icon: Tag },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Sticky Bar */}
      <div className="flex justify-between items-center mb-6 sticky top-20 bg-[var(--bg-color)]/95 backdrop-blur-md z-20 py-4 border-b border-[var(--panel-border)] rounded-b-xl px-2">
        <Link href="/tours" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <button type="submit" className="btn btn-primary shadow-lg" disabled={loading}>
          <Save size={16} /> {loading ? "Saving..." : (initialData ? "Update Tour" : "Save Tour")}
        </button>
      </div>

      <div className="glass-panel p-0 overflow-hidden shadow-sm">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[var(--panel-border)] bg-gray-50/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap
                  ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-100/50'}`}
              >
                <Icon size={18} />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 min-h-[500px]">
          
          {/* TAB: GENERAL INFO */}
          {activeTab === "general" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group md:col-span-2">
                  <label className="form-label">Tour Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="form-input text-lg font-medium" placeholder="e.g. Cultural Triangle 7 Days" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Slug (URL snippet) <span className="text-[10px] text-gray-400 font-normal ml-1">Auto-generated if empty</span></label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="form-input" placeholder="e.g. cultural-triangle-7d" />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="form-input bg-white">
                    <option value="round">Round Tour</option>
                    <option value="day">Day Tour</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className="form-input" placeholder="e.g. 7 Days / 6 Nights" />
                </div>
                
                <TagInput
                  label="Destinations"
                  tags={formData.destinations}
                  onChange={(tags) => setFormData((prev: any) => ({ ...prev, destinations: tags }))}
                  placeholder="e.g. Sigiriya, Kandy"
                />

                <div className="md:col-span-2">
                  <TagInput
                    label="Categories"
                    tags={formData.categories}
                    onChange={(tags) => setFormData((prev: any) => ({ ...prev, categories: tags }))}
                    placeholder="e.g. Wildlife, Heritage, Beach"
                  />
                </div>
              </div>

              <div className="form-group pt-4 border-t border-[var(--panel-border)]">
                <label className="form-label">Overview / Description</label>
                <textarea name="overview" value={formData.overview} onChange={handleChange} required className="form-input h-40 resize-y" placeholder="Detailed description of the tour..."></textarea>
              </div>
            </div>
          )}

          {/* TAB: FEATURES */}
          {activeTab === "features" && (
            <div className="animate-fade-in space-y-8">
              <div className="bg-blue-50/30 p-6 rounded-xl border border-blue-100/50">
                <DynamicStringList 
                  label="Tour Highlights" 
                  items={formData.highlights} 
                  onChange={(items) => setFormData((prev: any) => ({ ...prev, highlights: items }))} 
                  placeholder="e.g. Visit Sigiriya Rock Fortress"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50/30 p-6 rounded-xl border border-green-100/50">
                  <DynamicStringList 
                    label="What's Included" 
                    items={formData.inclusions} 
                    onChange={(items) => setFormData((prev: any) => ({ ...prev, inclusions: items }))} 
                    placeholder="e.g. 4-star Accommodation"
                  />
                </div>
                <div className="bg-red-50/30 p-6 rounded-xl border border-red-100/50">
                  <DynamicStringList 
                    label="What's NOT Included" 
                    items={formData.exclusions} 
                    onChange={(items) => setFormData((prev: any) => ({ ...prev, exclusions: items }))} 
                    placeholder="e.g. International Flights"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: ITINERARY */}
          {activeTab === "itinerary" && (
            <div className="animate-fade-in">
              <div className="bg-gray-50/50 p-6 rounded-xl border border-[var(--panel-border)]">
                <ItineraryBuilder 
                  itinerary={formData.itinerary} 
                  onChange={(itinerary) => setFormData((prev: any) => ({ ...prev, itinerary }))} 
                />
              </div>
            </div>
          )}

          {/* TAB: MEDIA */}
          {activeTab === "media" && (
            <div className="animate-fade-in space-y-8">
              <div className="bg-gray-50/50 p-6 rounded-xl border border-[var(--panel-border)]">
                <ImageUpload 
                  label="Cover Image (Required)"
                  value={formData.image} 
                  onChange={(url) => setFormData((prev: any) => ({ ...prev, image: url }))} 
                />
              </div>
              
              <div className="bg-gray-50/50 p-6 rounded-xl border border-[var(--panel-border)]">
                <div className="mb-2">
                  <label className="form-label mb-1">Gallery Images</label>
                  <p className="text-xs text-[var(--text-secondary)] mb-4">Add beautiful images showcasing the experience.</p>
                </div>
                <GalleryUpload 
                  images={formData.gallery} 
                  onChange={(urls) => setFormData((prev: any) => ({ ...prev, gallery: urls }))} 
                />
              </div>
            </div>
          )}

          {/* TAB: PRICING & PROMO */}
          {activeTab === "pricing" && (
            <div className="animate-fade-in space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pricing Box */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-[var(--panel-border)] shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Tag size={18} className="text-[var(--accent)]"/> Base Pricing</h3>
                    <div className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">Price (USD)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                          <input type="number" name="price" value={formData.price} onChange={handleChange} required className="form-input pl-8 text-lg font-medium" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[var(--text-secondary)]">Original Price <span className="text-xs font-normal">(Shown with strikethrough)</span></label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                          <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="form-input pl-8" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Offers Box */}
                  <div className={`p-6 rounded-xl border transition-colors ${formData.isOfferAvailable || formData.linkedOffers?.length > 0 ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50/50 border-[var(--panel-border)]'}`}>
                    <div className="form-group flex items-center gap-3 mb-4">
                      <input type="checkbox" id="isOfferAvailable" name="isOfferAvailable" checked={formData.isOfferAvailable} onChange={handleChange} className="w-5 h-5 rounded border-[var(--panel-border)] text-[var(--accent)] focus:ring-[var(--accent)] cursor-pointer" />
                      <label htmlFor="isOfferAvailable" className={`font-semibold cursor-pointer ${formData.isOfferAvailable ? 'text-blue-900' : 'text-[var(--text-primary)]'}`}>Enable Simple Percentage Offer</label>
                    </div>
                    
                    {formData.isOfferAvailable && (
                      <div className="form-group mb-6 animate-fade-in">
                        <label className="form-label text-blue-800">Offer Percentage (%)</label>
                        <div className="relative">
                          <input type="number" name="offerPercentage" value={formData.offerPercentage} onChange={handleChange} className="form-input bg-white border-blue-200 pr-8" placeholder="e.g. 15" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-800 font-medium">%</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Linked dynamic offers */}
                    <div className="pt-4 border-t border-blue-100">
                      <label className="form-label mb-3">Link Dynamic Offers</label>
                      {availableOffers.length > 0 ? (
                        <div className="space-y-3">
                          {availableOffers.map((offer: any) => (
                            <label key={offer._id} className="flex items-start gap-3 p-3 bg-white border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-50/50 transition">
                              <input 
                                type="checkbox" 
                                checked={formData.linkedOffers?.includes(offer._id)}
                                onChange={() => handleOfferToggle(offer._id)}
                                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <div>
                                <span className="block font-medium text-sm text-gray-900">{offer.title}</span>
                                <span className="block text-xs text-blue-600 font-semibold mt-0.5">{offer.discountBadge}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No offers available. Create some in the Offers section.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats & Promotion Box */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-[var(--panel-border)] shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">Visibility</h3>
                    <div className="form-group flex items-start gap-3 p-4 bg-orange-50/50 rounded-lg border border-orange-100">
                      <input type="checkbox" id="isPopular" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-5 h-5 rounded mt-0.5 cursor-pointer text-orange-500 focus:ring-orange-500" />
                      <div>
                        <label htmlFor="isPopular" className="font-semibold text-orange-900 cursor-pointer block">Feature in "Popular Tours"</label>
                        <p className="text-xs text-orange-700/80 mt-1">This will display the tour on the homepage in the popular section.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-[var(--panel-border)] shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">Manual Stats Setup</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Rating (1-5)</label>
                        <input type="number" name="rating" step="0.1" max="5" value={formData.rating} onChange={handleChange} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Review Count</label>
                        <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} className="form-input" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </form>
  );
}

