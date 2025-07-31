import { redirect } from "next/navigation";
import { isAuthenticated, getAuthPayload } from "../../../lib/auth";
import { getAllBlogPosts } from "../../../actions/blog";
import Link from "next/link";

async function AdminPage() {
  // Double-check authentication on the server side
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login");
  }

  // Get auth payload for additional info (optional)
  const authPayload = await getAuthPayload();

  // Get blog posts for dashboard stats
  const blogResult = await getAllBlogPosts();
  const posts = blogResult.success ? blogResult.posts || [] : [];

  const publishedPosts = posts.filter((p) => p.published);
  const draftPosts = posts.filter((p) => !p.published);
  const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here&apos;s an overview of your blog.</p>
          </div>

          {/* Blog Stats - Minimal */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <div className="flex space-x-8">
              <div>
                <span className="text-sm text-gray-500">Total Posts</span>
                <p className="text-lg font-semibold text-gray-900">{posts.length}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Published</span>
                <p className="text-lg font-semibold text-gray-900">{publishedPosts.length}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Drafts</span>
                <p className="text-lg font-semibold text-gray-900">{draftPosts.length}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Views</span>
                <p className="text-lg font-semibold text-gray-900">{totalViews}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin/blog"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Manage Posts
              </Link>
              <Link
                href="/admin/blog/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                New Post
              </Link>
            </div>
          </div>

          {/* Recent Blog Posts */}
          {posts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="divide-y divide-gray-200">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                          <span className="text-xs text-gray-500">{post.viewCount} views</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link href={`/admin/blog/edit/${post.id}`} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                          Edit
                        </Link>
                        {post.published && (
                          <Link href={`/blog/${post.slug}`} target="_blank" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
