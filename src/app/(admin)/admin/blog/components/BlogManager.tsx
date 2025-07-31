"use client";

import { useState } from "react";
import { deleteBlogPost, publishBlogPost, unpublishBlogPost } from "../../../../../actions/blog";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  published: boolean;
  publishedAt: Date | null;
  readingTime: number | null;
  viewCount: number;
  featuredImage: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

interface BlogManagerProps {
  initialPosts: Post[];
}

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "draft") return post.status === "DRAFT";
    if (filter === "published") return post.status === "PUBLISHED";
    return true;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    setLoading(id);
    try {
      const result = await deleteBlogPost(id);
      if (result.success) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert("Error deleting post: " + result.error);
      }
    } catch (error) {
      alert("Error deleting post");
    } finally {
      setLoading(null);
    }
  };

  const handlePublish = async (id: string) => {
    setLoading(id);
    try {
      const result = await publishBlogPost(id);
      if (result.success) {
        setPosts(posts.map((post) => (post.id === id ? { ...post, status: "PUBLISHED" as const, published: true, publishedAt: new Date() } : post)));
      } else {
        alert("Error publishing post: " + result.error);
      }
    } catch (error) {
      alert("Error publishing post");
    } finally {
      setLoading(null);
    }
  };

  const handleUnpublish = async (id: string) => {
    setLoading(id);
    try {
      const result = await unpublishBlogPost(id);
      if (result.success) {
        setPosts(posts.map((post) => (post.id === id ? { ...post, status: "DRAFT" as const, published: false, publishedAt: null } : post)));
      } else {
        alert("Error unpublishing post: " + result.error);
      }
    } catch (error) {
      alert("Error unpublishing post");
    } finally {
      setLoading(null);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Not published";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string, published: boolean) => {
    if (status === "PUBLISHED" && published) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Draft</span>;
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <Link
            href="/admin/blog/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Create New Post
          </Link>
        </div>

        {/* Filter buttons */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === "all" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({posts.length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === "draft" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Drafts ({posts.filter((p) => p.status === "DRAFT").length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Published ({posts.filter((p) => p.status === "PUBLISHED").length})
          </button>
        </div>
      </div>

      {/* Posts list */}
      <div className="divide-y divide-gray-200">
        {filteredPosts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-500 mb-4">{filter === "all" ? "You haven't created any blog posts yet." : `No ${filter} posts found.`}</p>
            <Link
              href="/admin/blog/create"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{post.title}</h3>
                    {getStatusBadge(post.status, post.published)}
                  </div>

                  {post.excerpt && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>}

                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Updated: {formatDate(post.updatedAt)}</span>
                    {post.publishedAt && <span>Published: {formatDate(post.publishedAt)}</span>}
                    <span>{post.viewCount} views</span>
                    {post.readingTime && <span>{post.readingTime} min read</span>}
                  </div>

                  {post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Link href={`/admin/blog/edit/${post.id}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                    Edit
                  </Link>

                  {post.published ? (
                    <button
                      onClick={() => handleUnpublish(post.id)}
                      disabled={loading === post.id}
                      className="text-yellow-600 hover:text-yellow-900 text-sm font-medium disabled:opacity-50"
                    >
                      {loading === post.id ? "Loading..." : "Unpublish"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(post.id)}
                      disabled={loading === post.id}
                      className="text-green-600 hover:text-green-900 text-sm font-medium disabled:opacity-50"
                    >
                      {loading === post.id ? "Loading..." : "Publish"}
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={loading === post.id}
                    className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
                  >
                    {loading === post.id ? "Loading..." : "Delete"}
                  </button>

                  {post.published && (
                    <Link href={`/blog/${post.slug}`} target="_blank" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                      View
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
