import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getHeroSlides } from "@/app/actions/heroSlideActions";

export default async function HeroSlidesPage() {
  const slides = await getHeroSlides();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hero Slides</h1>
          <p className="text-[var(--text-secondary)]">Manage the dynamic hero section on the homepage.</p>
        </div>
        <Link href="/hero-slides/new" className="btn btn-primary">
          <Plus size={18} /> New Slide
        </Link>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Slide</th>
              <th>Order</th>
              <th>Title</th>
              <th>Tagline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((slide: any) => (
              <tr key={slide._id}>
                <td>
                  <img src={slide.url} alt={slide.title} className="w-16 h-10 rounded-md object-cover bg-black/20" />
                </td>
                <td>{slide.order}</td>
                <td className="font-medium text-[var(--text-primary)]">{slide.title}</td>
                <td>{slide.tagline}</td>
                <td>
                  <div className="action-links">
                    <Link href={`/hero-slides/${slide._id}/edit`} className="action-link edit" title="Edit">
                      <Edit size={16} />
                    </Link>
                    <form action={async () => {
                      "use server";
                      await import("@/app/actions/heroSlideActions").then(m => m.deleteHeroSlide(slide._id));
                    }}>
                      <button type="submit" className="action-link delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {slides.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[var(--text-secondary)]">
                  No slides found. Create your first hero slide to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
