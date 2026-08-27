import PostForm from "@/components/forms/PostForm";
import { getPost } from "@/app/actions/postActions";

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
        <p className="text-[var(--text-secondary)]">Update your blog post or news story.</p>
      </div>
      <PostForm initialData={post} />
    </div>
  );
}
