import { notFound } from "next/navigation";
import { getHeroSlide } from "@/app/actions/heroSlideActions";
import HeroSlideForm from "@/components/forms/HeroSlideForm";

export default async function EditHeroSlidePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const slide = await getHeroSlide(params.id);

  if (!slide) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Edit Hero Slide</h1>
        <p className="text-[var(--text-secondary)]">Update the details for this hero slide.</p>
      </div>

      <HeroSlideForm initialData={slide} />
    </div>
  );
}
