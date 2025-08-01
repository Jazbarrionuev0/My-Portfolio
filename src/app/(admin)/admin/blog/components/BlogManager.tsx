"use client";

import { useState } from "react";
import { deleteBlogPost, publishBlogPost, unpublishBlogPost, setFeaturedBlogPost, unfeatureBlogPost } from "../../../../../actions/blog";
import Link from "next/link";
import NextImage from "next/image";
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
  Folder,
  Star,
  ImageIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../components/ui/popover";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  published: boolean;
  featured: boolean;
  publishedAt: Date | null;
  readingTime: number | null;
  viewCount: number;
  featuredImage: string | null;
  category: {
    id: string;
    title: string;
  } | null;
  tags: {
    id: string;
    title: string;
  }[];
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
      (post.category && post.category.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.tags.some((tag) => tag.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleDelete = async (id: string) => {
    setLoading(id);

    const loadingToast = toast.loading("Deleting blog post...");

    try {
      const result = await deleteBlogPost(id);
      if (result.success) {
        setPosts(posts.filter((post) => post.id !== id));
        setShowDeleteModal(null);
        toast.dismiss(loadingToast);
        toast.success("Blog post deleted successfully", {
          description: "The post has been permanently removed from your blog.",
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to delete post", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to delete post", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  const confirmDelete = (id: string) => {
    setShowDeleteModal(id);
  };

  const handlePublish = async (id: string) => {
    setLoading(id);

    const loadingToast = toast.loading("Publishing blog post...");

    try {
      const result = await publishBlogPost(id);
      if (result.success) {
        setPosts(posts.map((post) => (post.id === id ? { ...post, status: "PUBLISHED" as const, published: true, publishedAt: new Date() } : post)));
        toast.dismiss(loadingToast);
        toast.success("Blog post published successfully", {
          description: "Your post is now live and visible to readers.",
          action: {
            label: "View Live",
            onClick: () => {
              const post = posts.find((p) => p.id === id);
              if (post) window.open(`/blog/${post.slug}`, "_blank");
            },
          },
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to publish post", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to publish post", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleUnpublish = async (id: string) => {
    setLoading(id);

    const loadingToast = toast.loading("Unpublishing blog post...");

    try {
      const result = await unpublishBlogPost(id);
      if (result.success) {
        setPosts(posts.map((post) => (post.id === id ? { ...post, status: "DRAFT" as const, published: false, publishedAt: null } : post)));
        toast.dismiss(loadingToast);
        toast.success("Blog post unpublished successfully", {
          description: "Your post is now saved as a draft and no longer visible to readers.",
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to unpublish post", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to unpublish post", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleSetFeatured = async (id: string) => {
    setLoading(id);

    const loadingToast = toast.loading("Setting featured post...");

    try {
      const result = await setFeaturedBlogPost(id);
      if (result.success) {
        setPosts(posts.map((post) => ({ ...post, featured: post.id === id })));
        toast.dismiss(loadingToast);
        toast.success("Blog post featured successfully", {
          description: "This post is now featured on your homepage.",
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to feature post", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to feature post", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleUnfeature = async (id: string) => {
    setLoading(id);

    const loadingToast = toast.loading("Unfeaturing blog post...");

    try {
      const result = await unfeatureBlogPost(id);
      if (result.success) {
        setPosts(posts.map((post) => (post.id === id ? { ...post, featured: false } : post)));
        toast.dismiss(loadingToast);
        toast.success("Blog post unfeatured successfully", {
          description: "This post is no longer featured on your homepage.",
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to unfeature post", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to unfeature post", {
        description: "An unexpected error occurred. Please try again.",
      });
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
          <CheckCircle className="w-3 h-3" />
          Published
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
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
            className="inline-flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            aria-label="More actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1" align="end">
          <div className="space-y-1">
            <Link
              href={`/admin/blog/edit/${post.id}`}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Edit3 className="w-4 h-4" />
              Edit Post
            </Link>

            {post.published ? (
              <button
                onClick={() => handleAction(() => handleUnpublish(post.id))}
                disabled={loading === post.id}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === post.id ? (
                  <div className="w-4 h-4 border-2 border-yellow-600 dark:border-yellow-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {loading === post.id ? "Unpublishing..." : "Unpublish"}
              </button>
            ) : (
              <button
                onClick={() => handleAction(() => handlePublish(post.id))}
                disabled={loading === post.id}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === post.id ? (
                  <div className="w-4 h-4 border-2 border-green-600 dark:border-green-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {loading === post.id ? "Publishing..." : "Publish"}
              </button>
            )}

            {/* Featured Options - only for published posts */}
            {post.published &&
              (post.featured ? (
                <button
                  onClick={() => handleAction(() => handleUnfeature(post.id))}
                  disabled={loading === post.id}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === post.id ? (
                    <div className="w-4 h-4 border-2 border-amber-600 dark:border-amber-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Star className="w-4 h-4 fill-current" />
                  )}
                  {loading === post.id ? "Unfeaturing..." : "Remove Featured"}
                </button>
              ) : (
                <button
                  onClick={() => handleAction(() => handleSetFeatured(post.id))}
                  disabled={loading === post.id}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === post.id ? (
                    <div className="w-4 h-4 border-2 border-amber-600 dark:border-amber-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Star className="w-4 h-4" />
                  )}
                  {loading === post.id ? "Featuring..." : posts.some((p) => p.featured) ? "Make Featured" : "Make Featured"}
                </button>
              ))}

            {post.published && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </Link>
            )}

            <div className="border-t border-border my-1" />

            <button
              onClick={() => handleAction(() => confirmDelete(post.id))}
              disabled={loading === post.id}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === post.id ? (
                <div className="w-4 h-4 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin" />
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
      <div className="bg-background rounded-xl shadow-sm border border-border">
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Blog Management</h1>
              <p className="text-sm text-muted-foreground mt-1">Create, edit, and manage your blog posts</p>
            </div>
            <Link
              href="/admin/blog/create"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Create New Post
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts by title, content, category, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder-muted-foreground"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                    filter === "all" ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  All ({posts.length})
                </button>
                <button
                  onClick={() => setFilter("draft")}
                  className={`px-4 py-2.5 text-sm font-medium border-l border-border transition-colors ${
                    filter === "draft"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                      : "bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  Drafts ({posts.filter((p) => p.status === "DRAFT").length})
                </button>
                <button
                  onClick={() => setFilter("published")}
                  className={`px-4 py-2.5 text-sm font-medium border-l border-border transition-colors ${
                    filter === "published"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  Published ({posts.filter((p) => p.status === "PUBLISHED").length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts list */}
        <div className="divide-y divide-border">
          {filteredPosts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{searchTerm ? "No posts found" : "No blog posts found"}</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                {searchTerm
                  ? `No posts match your search "${searchTerm}". Try adjusting your search terms.`
                  : filter === "all"
                  ? "You haven't created any blog posts yet. Start by creating your first post."
                  : `No ${filter} posts found. Try switching to a different filter.`}
              </p>
              {!searchTerm && (
                <Link
                  href="/admin/blog/create"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredPosts.map((post) => (
                <div key={post.id} className="px-6 py-6 hover:bg-accent/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    {/* Featured Image */}
                    <div className="flex-shrink-0">
                      {post.featuredImage ? (
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border border-border bg-muted">
                          <NextImage src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 96px, 128px" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(post.status, post.published)}
                              {post.featured && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                                  <Star className="w-3 h-3 fill-current" />
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Category */}
                          {post.category && (
                            <div className="mb-3">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                                <Folder className="w-3 h-3 mr-1" />
                                {post.category.title}
                              </span>
                            </div>
                          )}

                          {post.excerpt && (
                            <p
                              className="text-muted-foreground mb-4 leading-relaxed overflow-hidden"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical" as const,
                              }}
                            >
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Updated {formatDate(post.updatedAt)}</span>
                            </div>
                            {post.publishedAt && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-green-500" />
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
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag.title}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                                  +{post.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-6 border-l border-border pl-4">
                          <ActionMenu post={post} />
                        </div>
                      </div>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-xl shadow-xl max-w-md w-full border border-border">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Delete Blog Post</h3>
                  <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                </div>
              </div>

              <div className="text-muted-foreground mb-6">
                <p className="mb-3">
                  Are you sure you want to delete this blog post? All data associated with this post will be permanently removed.
                </p>
                {posts.find((p) => p.id === showDeleteModal)?.featured && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">Featured Post Warning</span>
                    </div>
                    <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">
                      This is your featured post. After deletion, you&apos;ll need to select a new featured post for your homepage.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
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
