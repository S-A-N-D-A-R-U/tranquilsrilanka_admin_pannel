import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getOffers } from "@/app/actions/offerActions";

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Offers Management</h1>
          <p className="text-[var(--text-secondary)]">Manage special offers and deals.</p>
        </div>
        <Link href="/offers/new" className="btn btn-primary">
          <Plus size={18} /> New Offer
        </Link>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Offer Title</th>
              <th>Discount Badge</th>
              <th>Validity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer: any) => (
              <tr key={offer._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={offer.image} alt={offer.title} className="w-10 h-10 rounded-md object-cover bg-black/20" />
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{offer.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{offer.slug}</p>
                    </div>
                  </div>
                </td>
                <td><span className="font-semibold text-[var(--gold)]">{offer.discountBadge}</span></td>
                <td>{offer.validityText}</td>
                <td>
                  {offer.isActive ? (
                    <span className="status-badge active">Active</span>
                  ) : (
                    <span className="status-badge inactive">Inactive</span>
                  )}
                </td>
                <td>
                  <div className="action-links">
                    <Link href={`/offers/${offer._id}/edit`} className="action-link edit" title="Edit">
                      <Edit size={16} />
                    </Link>
                    <form action={async () => {
                      "use server";
                      await import("@/app/actions/offerActions").then(m => m.deleteOffer(offer._id));
                    }}>
                      <button type="submit" className="action-link delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[var(--text-secondary)]">
                  No offers found. Create your first offer to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
