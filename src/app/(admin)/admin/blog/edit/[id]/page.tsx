import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "../../../../../../lib/auth";
import { getBlogPostById } from "../../../../../../actions/blog";
import BlogEditor from "../../components/BlogEditor";

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

async function EditBlogPage({ params }: EditBlogPageProps) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }

  // Fetch the blog post
  const result = await getBlogPostById(params.id);

  if (!result.success || !result.post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="mt-2 text-gray-600">Edit and update your blog post</p>
        </div>
        <BlogEditor mode="edit" post={result.post} />
      </div>
    </div>
  );
}

export default EditBlogPage;
