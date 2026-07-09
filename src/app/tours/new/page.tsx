import TourForm from "@/components/forms/TourForm";
import { getOffers } from "@/app/actions/offerActions";

export default async function NewTourPage() {
  const offers = await getOffers();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Tour</h1>
        <p className="text-[var(--text-secondary)]">Add a new tour package to your platform.</p>
      </div>
      <TourForm availableOffers={offers} />
    </div>
  );
}
