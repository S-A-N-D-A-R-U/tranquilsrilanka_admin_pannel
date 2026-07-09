import ActivityForm from "@/components/forms/ActivityForm";

export default function NewActivityPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Activity</h1>
        <p className="text-[var(--text-secondary)]">Add a new activity or experience to your platform.</p>
      </div>
      <ActivityForm />
    </div>
  );
}
