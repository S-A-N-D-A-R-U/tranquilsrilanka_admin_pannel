import PostForm from "@/components/forms/PostForm";

export default function NewPostPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-[var(--text-secondary)]">Write a new story, guide, or news update.</p>
      </div>
      <PostForm />
    </div>
  );
}
