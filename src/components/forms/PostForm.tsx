"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { createPost, updatePost } from "@/app/actions/postActions";
import { Save, ArrowLeft, Info, ImageIcon, ExternalLink, Code } from "lucide-react";
import Link from "next/link";

export default function PostForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: "",
    slug: "",
    category: "News",
    readTime: "5 min read",
    excerpt: "",
    content: "",
    image: "",
    externalLink: "",
    isFeatured: false,
    isHtml: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        await updatePost(initialData._id, formData);
      } else {
        await createPost(formData);
      }
      router.push("/posts");
    } catch (error) {
      console.error(error);
      alert("Failed to save post");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      {/* Header Sticky Bar */}
      <div className="flex justify-between items-center mb-6 sticky top-20 bg-[var(--bg-color)]/95 backdrop-blur-md z-20 py-4 border-b border-[var(--panel-border)] rounded-b-xl px-2">
        <Link href="/posts" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <button type="submit" className="btn btn-primary shadow-lg" disabled={loading}>
          <Save size={16} /> {loading ? "Saving..." : (initialData ? "Update Post" : "Save Post")}
        </button>
      </div>

      <div className="glass-panel p-6 md:p-8 shadow-sm">
        <div className="space-y-6 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group md:col-span-2">
              <label className="form-label">Post Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="form-input text-lg font-medium" placeholder="e.g. Top 10 Hidden Gems in Sri Lanka" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Slug (URL snippet)</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="form-input" placeholder="e.g. top-10-hidden-gems (auto-generated if empty)" />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-input bg-white">
                <option value="News">News</option>
                <option value="Blog">Blog</option>
                <option value="Travel Guide">Travel Guide</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Read Time</label>
              <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} required className="form-input" placeholder="e.g. 5 min read" />
            </div>

            <div className="form-group">
              <label className="form-label flex items-center gap-2"><ExternalLink size={16} /> External Link (e.g. Pinterest)</label>
              <input type="url" name="externalLink" value={formData.externalLink} onChange={handleChange} className="form-input" placeholder="https://pinterest.com/... (optional)" />
              <p className="text-xs text-gray-500 mt-1">If provided, users clicking this post will be redirected to this link.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--panel-border)]">
            <div className="form-group flex items-center gap-3">
              <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-[var(--panel-border)] text-orange-500 focus:ring-orange-500 cursor-pointer" />
              <label htmlFor="isFeatured" className="font-semibold cursor-pointer text-orange-900 block">Featured on Homepage</label>
            </div>
            
            <div className="form-group flex items-center gap-3">
              <input type="checkbox" id="isHtml" name="isHtml" checked={formData.isHtml} onChange={handleChange} className="w-5 h-5 rounded border-[var(--panel-border)] text-blue-500 focus:ring-blue-500 cursor-pointer" />
              <label htmlFor="isHtml" className="font-semibold cursor-pointer text-blue-900 flex items-center gap-2"><Code size={18}/> Content is HTML Snippet</label>
            </div>
          </div>

          <div className="form-group pt-4 border-t border-[var(--panel-border)]">
            <label className="form-label">Short Excerpt (For Cards)</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required className="form-input h-20 resize-y" placeholder="Brief summary..."></textarea>
          </div>

          <div className="form-group">
            <label className="form-label flex justify-between">
              Full Content
              {formData.isHtml && <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">HTML Mode Active</span>}
            </label>
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              required 
              className={`form-input h-64 resize-y font-mono ${formData.isHtml ? 'bg-gray-900 text-green-400' : ''}`} 
              placeholder={formData.isHtml ? "<h1>Advanced HTML Design</h1>..." : "Write your blog post here..."}
            ></textarea>
          </div>
          
          <div className="bg-gray-50/50 p-6 rounded-xl border border-[var(--panel-border)] mt-6">
            <ImageUpload 
              label="Cover Image (Required)"
              value={formData.image} 
              onChange={(url) => setFormData((prev: any) => ({ ...prev, image: url }))} 
            />
          </div>
        </div>
      </div>
    </form>
  );
}
