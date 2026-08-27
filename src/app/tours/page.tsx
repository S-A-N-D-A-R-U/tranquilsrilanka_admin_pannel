import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getTours } from "@/app/actions/tourActions";

export const dynamic = 'force-dynamic';

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tours Management</h1>
          <p className="text-[var(--text-secondary)]">Manage your multi-day and day tours.</p>
        </div>
        <Link href="/tours/new" className="btn btn-primary">
          <Plus size={18} /> New Tour
        </Link>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tour Name</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour: any) => (
              <tr key={tour._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={tour.image} alt={tour.title} className="w-10 h-10 rounded-md object-cover bg-black/20" />
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{tour.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{tour.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="capitalize">{tour.type}</td>
                <td>{tour.duration}</td>
                <td>${tour.price}</td>
                <td>
                  <span className="status-badge active">Active</span>
                </td>
                <td>
                  <div className="action-links">
                    <Link href={`/tours/${tour._id}/edit`} className="action-link edit" title="Edit">
                      <Edit size={16} />
                    </Link>
                    <form action={async () => {
                      "use server";
                      await import("@/app/actions/tourActions").then(m => m.deleteTour(tour._id));
                    }}>
                      <button type="submit" className="action-link delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[var(--text-secondary)]">
                  No tours found. Create your first tour to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
