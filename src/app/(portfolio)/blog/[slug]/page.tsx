import { getBlogPostBySlug } from "@/src/actions/blog";
import { notFound } from "next/navigation";
import Image from "next/image";

const page: React.FC<{ params: { slug: string } }> = async ({ params }) => {
  const slug = params.slug;

  console.log(slug);

  // Fetch the blog post by slug
  const result = await getBlogPostBySlug(slug);

  console.log(result);
  // If post not found, show 404
  if (!result.success || !result.post) {
    notFound();
  }

  const { post } = result;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Blog Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

        {/* Post Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 border-b border-gray-200 pb-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime} min read
          </span>

          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {post.viewCount} views
          </span>

          {post.status === "DRAFT" && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Draft</span>}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tag.title}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 relative h-64 md:h-96 w-full">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover rounded-lg shadow-lg" />
        </div>
      )}

      {/* Blog Post Content */}
      <article className="blog-content prose prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />

      {/* Post Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <p>
            Last updated:{" "}
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default page;
