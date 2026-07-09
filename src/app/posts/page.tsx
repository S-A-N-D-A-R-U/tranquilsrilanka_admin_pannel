import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getPosts } from "@/app/actions/postActions";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog & News Management</h1>
          <p className="text-[var(--text-secondary)]">Manage your stories, travel guides, and news.</p>
        </div>
        <Link href="/posts/new" className="btn btn-primary">
          <Plus size={18} /> New Post
        </Link>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr key={post._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={post.image} alt={post.title} className="w-10 h-10 rounded-md object-cover bg-black/20" />
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{post.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{post.slug}</p>
                    </div>
                  </div>
                </td>
                <td><span className="text-sm px-2 py-1 bg-gray-100 rounded-md">{post.category}</span></td>
                <td>
                  {post.isFeatured ? (
                    <span className="status-badge active">Featured</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td>
                  <div className="action-links">
                    <Link href={`/posts/${post._id}/edit`} className="action-link edit" title="Edit">
                      <Edit size={16} />
                    </Link>
                    <form action={async () => {
                      "use server";
                      await import("@/app/actions/postActions").then(m => m.deletePost(post._id));
                    }}>
                      <button type="submit" className="action-link delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-[var(--text-secondary)]">
                  No posts found. Create your first blog post to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
