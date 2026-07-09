import HeroSlideForm from "@/components/forms/HeroSlideForm";

export default function NewHeroSlidePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">New Hero Slide</h1>
        <p className="text-[var(--text-secondary)]">Create a new slide for the homepage hero section.</p>
      </div>

      <HeroSlideForm />
    </div>
  );
}
