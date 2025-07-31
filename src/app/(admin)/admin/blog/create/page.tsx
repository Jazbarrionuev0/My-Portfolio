import { redirect } from "next/navigation";
import { isAuthenticated } from "../../../../../lib/auth";
import BlogEditor from "../components/BlogEditor";

async function CreateBlogPage() {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <p className="mt-2 text-gray-600">Write and publish a new blog post</p>
        </div>
        <BlogEditor mode="create" />
      </div>
    </div>
  );
}

export default CreateBlogPage;
