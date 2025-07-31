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
    <div className="min-h-screen  ">
      <div className="max-w-4xl mx-auto">
        <BlogEditor mode="edit" post={result.post} />
      </div>
    </div>
  );
}

export default EditBlogPage;
