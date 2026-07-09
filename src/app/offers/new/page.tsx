import OfferForm from "@/components/forms/OfferForm";

export default function NewOfferPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Offer</h1>
        <p className="text-[var(--text-secondary)]">Create a new special offer to link to your tours.</p>
      </div>
      <OfferForm />
    </div>
  );
}
