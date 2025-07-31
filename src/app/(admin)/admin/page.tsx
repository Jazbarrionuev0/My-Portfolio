import { redirect } from "next/navigation";
import { isAuthenticated, getAuthPayload } from "../../../lib/auth";
import { getAllBlogPosts } from "../../../actions/blog";
import LogoutButton from "./components/LogoutButton";
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              {authPayload && <p className="text-sm text-gray-600 mt-1">Logged in as {authPayload.role} • Session expires in 7 days</p>}
            </div>
            <LogoutButton />
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900">Total Posts</h3>
              <p className="text-2xl font-bold text-blue-900">{posts.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-900">Published</h3>
              <p className="text-2xl font-bold text-green-900">{publishedPosts.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-900">Drafts</h3>
              <p className="text-2xl font-bold text-yellow-900">{draftPosts.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-900">Total Views</h3>
              <p className="text-2xl font-bold text-purple-900">{totalViews}</p>
            </div>
          </div>

          {/* Management Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Blog Management</h3>
              <p className="text-blue-700 mb-4">Create, edit, and manage your blog posts</p>
              <div className="space-y-2">
                <Link
                  href="/admin/blog"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
                >
                  Manage All Posts
                </Link>
                <Link
                  href="/admin/blog/create"
                  className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
                >
                  Create New Post
                </Link>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Projects</h3>
              <p className="text-green-700 mb-4">Manage portfolio projects</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Coming Soon
              </button>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Analytics</h3>
              <p className="text-purple-700 mb-4">View site analytics and performance</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Coming Soon
              </button>
            </div>
          </div>

          {/* Recent Blog Posts */}
          {posts.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h3>
                <Link href="/admin/blog" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between py-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-500">
                          {post.published ? "Published" : "Draft"} • {post.viewCount} views
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/blog/edit/${post.id}`} className="text-indigo-600 hover:text-indigo-900 text-xs font-medium">
                          Edit
                        </Link>
                        {post.published && (
                          <Link href={`/blog/${post.slug}`} target="_blank" className="text-gray-600 hover:text-gray-900 text-xs font-medium">
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

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Security Notice</h4>
            <p className="text-sm text-yellow-700">
              Your session is protected with encrypted JWT tokens and secure cookies. Always log out when finished, especially on shared computers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
