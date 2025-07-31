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
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-900 mb-2">Error Loading Blogs</h1>
            <p className="text-red-700">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <BlogManager initialPosts={result.posts || []} />
      </div>
    </div>
  );
}

export default AdminBlogPage;
