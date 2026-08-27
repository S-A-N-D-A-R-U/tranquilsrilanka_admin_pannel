import OfferForm from "@/components/forms/OfferForm";
import { getOffer } from "@/app/actions/offerActions";

export const dynamic = 'force-dynamic';

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await getOffer(id);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Offer</h1>
        <p className="text-[var(--text-secondary)]">Update details for this special offer.</p>
      </div>
      <OfferForm initialData={offer} />
    </div>
  );
}
