"use client";

import { useState } from "react";
import { deleteBlogPost, publishBlogPost, unpublishBlogPost } from "../../../../../actions/blog";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Calendar,
  Tag,
  MessageSquare,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../components/ui/popover";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = (() => {
      if (filter === "all") return true;
      if (filter === "draft") return post.status === "DRAFT";
      if (filter === "published") return post.status === "PUBLISHED";
      return true;
    })();

    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (id: string) => {
    setLoading(id);
    try {
      const result = await deleteBlogPost(id);
      if (result.success) {
        setPosts(posts.filter((post) => post.id !== id));
        setShowDeleteModal(null);
      } else {
        alert("Error deleting post: " + result.error);
      }
    } catch (error) {
      alert("Error deleting post");
    } finally {
      setLoading(null);
    }
  };

  const confirmDelete = (id: string) => {
    setShowDeleteModal(id);
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
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3 h-3" />
          Published
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3 h-3" />
        Draft
      </span>
    );
  };

  const getStatsCards = () => {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter((p) => p.status === "PUBLISHED").length;
    const draftPosts = posts.filter((p) => p.status === "DRAFT").length;
    const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0);

    return [
      { label: "Total Posts", value: totalPosts, icon: FileText, color: "bg-blue-500" },
      { label: "Published", value: publishedPosts, icon: CheckCircle, color: "bg-emerald-500" },
      { label: "Drafts", value: draftPosts, icon: Clock, color: "bg-amber-500" },
      { label: "Total Views", value: totalViews, icon: Eye, color: "bg-purple-500" },
    ];
  };

  const ActionMenu = ({ post }: { post: Post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAction = (action: () => void) => {
      action();
      setIsOpen(false);
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="More actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1" align="end">
          <div className="space-y-1">
            <Link
              href={`/admin/blog/edit/${post.id}`}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Edit3 className="w-4 h-4" />
              Edit Post
            </Link>

            {post.published ? (
              <button
                onClick={() => handleAction(() => handleUnpublish(post.id))}
                disabled={loading === post.id}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === post.id ? (
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {loading === post.id ? "Unpublishing..." : "Unpublish"}
              </button>
            ) : (
              <button
                onClick={() => handleAction(() => handlePublish(post.id))}
                disabled={loading === post.id}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === post.id ? (
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {loading === post.id ? "Publishing..." : "Publish"}
              </button>
            )}

            {post.published && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </Link>
            )}

            <div className="border-t border-gray-200 my-1" />

            <button
              onClick={() => handleAction(() => confirmDelete(post.id))}
              disabled={loading === post.id}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === post.id ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {loading === post.id ? "Deleting..." : "Delete Post"}
            </button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div>
      {/* Stats Cards */}
      {/* <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getStatsCards().map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-sm text-gray-600 mt-1">Create, edit, and manage your blog posts</p>
            </div>
            <Link
              href="/admin/blog/create"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Create New Post
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                    filter === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All ({posts.length})
                </button>
                <button
                  onClick={() => setFilter("draft")}
                  className={`px-4 py-2.5 text-sm font-medium border-l border-gray-300 transition-colors ${
                    filter === "draft" ? "bg-amber-100 text-amber-700" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Drafts ({posts.filter((p) => p.status === "DRAFT").length})
                </button>
                <button
                  onClick={() => setFilter("published")}
                  className={`px-4 py-2.5 text-sm font-medium border-l border-gray-300 transition-colors ${
                    filter === "published" ? "bg-emerald-100 text-emerald-700" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Published ({posts.filter((p) => p.status === "PUBLISHED").length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts list */}
        <div className="divide-y divide-gray-200">
          {filteredPosts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{searchTerm ? "No posts found" : "No blog posts found"}</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                {searchTerm
                  ? `No posts match your search "${searchTerm}". Try adjusting your search terms.`
                  : filter === "all"
                  ? "You haven't created any blog posts yet. Start by creating your first post."
                  : `No ${filter} posts found. Try switching to a different filter.`}
              </p>
              {!searchTerm && (
                <Link
                  href="/admin/blog/create"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredPosts.map((post) => (
                <div key={post.id} className="px-6 py-6 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                        {getStatusBadge(post.status, post.published)}
                      </div>

                      {post.excerpt && (
                        <p
                          className="text-gray-600 mb-4 leading-relaxed overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical" as const,
                          }}
                        >
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Updated {formatDate(post.updatedAt)}</span>
                        </div>
                        {post.publishedAt && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span>Published {formatDate(post.publishedAt)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.viewCount} views</span>
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        )}
                      </div>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-6 border-l border-gray-200 pl-4">
                      <ActionMenu post={post} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Blog Post</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this blog post? All data associated with this post will be permanently removed.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  disabled={loading === showDeleteModal}
                  className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === showDeleteModal ? "Deleting..." : "Delete Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
