import { redirect } from "next/navigation";
import { isAuthenticated } from "../../../../lib/auth";
import { getAllBlogPosts } from "../../../../actions/blog";
import BlogManager from "./components/BlogManager";

async function AdminBlogPage() {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }

  // Fetch all blog posts
  const result = await getAllBlogPosts();

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-900 mb-2">Error Loading Blogs</h1>
            <p className="text-red-700">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <BlogManager initialPosts={result.posts || []} />
      </div>
    </div>
  );
}

export default AdminBlogPage;
