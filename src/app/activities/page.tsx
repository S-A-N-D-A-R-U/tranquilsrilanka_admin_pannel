import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getActivities } from "@/app/actions/activityActions";

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Activities Management</h1>
          <p className="text-[var(--text-secondary)]">Manage your day experiences and things to do.</p>
        </div>
        <Link href="/activities/new" className="btn btn-primary">
          <Plus size={18} /> New Activity
        </Link>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity: any) => (
              <tr key={activity._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={activity.image} alt={activity.title} className="w-10 h-10 rounded-md object-cover bg-black/20" />
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{activity.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{activity.destination}</p>
                    </div>
                  </div>
                </td>
                <td>{activity.category}</td>
                <td>{activity.duration}</td>
                <td>${activity.price}</td>
                <td>
                  <span className="status-badge active">Active</span>
                </td>
                <td>
                  <div className="action-links">
                    <Link href={`/activities/${activity._id}/edit`} className="action-link edit" title="Edit">
                      <Edit size={16} />
                    </Link>
                    <form action={async () => {
                      "use server";
                      await import("@/app/actions/activityActions").then(m => m.deleteActivity(activity._id));
                    }}>
                      <button type="submit" className="action-link delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {activities.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[var(--text-secondary)]">
                  No activities found. Create your first activity to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
