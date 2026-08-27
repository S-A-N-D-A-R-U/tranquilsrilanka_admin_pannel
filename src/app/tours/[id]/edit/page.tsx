import TourForm from "@/components/forms/TourForm";
import { getTour } from "@/app/actions/tourActions";
import { getOffers } from "@/app/actions/offerActions";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tour = await getTour(id);
  const offers = await getOffers();

  if (!tour) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Tour: {tour.title}</h1>
        <p className="text-[var(--text-secondary)]">Update the details for this tour package.</p>
      </div>
      <TourForm initialData={tour} availableOffers={offers} />
    </div>
  );
}
