import ActivityForm from "@/components/forms/ActivityForm";
import { getActivity } from "@/app/actions/activityActions";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const activity = await getActivity(id);

  if (!activity) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Activity: {activity.title}</h1>
        <p className="text-[var(--text-secondary)]">Update the details for this activity.</p>
      </div>
      <ActivityForm initialData={activity} />
    </div>
  );
}
