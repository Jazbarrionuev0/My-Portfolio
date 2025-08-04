"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return { success: true, tags };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { success: false, error: "Failed to fetch tags" };
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function getAllBlogPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
        category: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return { success: true, posts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function getPublishedProjects() {
  try {
    const projects = await prisma.post.findMany({
      where: {
        published: true,
        status: "PUBLISHED",
      },
      include: {
        tags: true,
        category: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return { success: true, projects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function getLatestProject() {
  try {
    const latestProject = await prisma.post.findFirst({
      where: {
        published: true,
        status: "PUBLISHED",
      },
      include: {
        tags: true,
        category: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return { success: true, project: latestProject };
  } catch (error) {
    console.error("Error fetching latest project:", error);
    return { success: false, error: "Failed to fetch latest project" };
  }
}

export async function saveBlogPost(postData: {
  title: string;
  contentHtml: string;
  contentJson: string;
  contentText: string;
  excerpt?: string;
  tags?: string[];
  categoryId: string;
  featuredImage?: string | null;
}) {
  try {
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const wordCount = postData.contentText.split(/\s+/).filter((word) => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200);

    let contentJsonParsed;
    try {
      contentJsonParsed = JSON.parse(postData.contentJson);
    } catch (error) {
      console.error("Error parsing JSON content:", error);
      contentJsonParsed = { type: "doc", content: [] }; // Fallback
    }

    const post = await prisma.post.create({
      data: {
        title: postData.title,
        slug: slug,
        excerpt: postData.excerpt || null,
        contentHtml: postData.contentHtml,
        contentJson: contentJsonParsed,
        contentText: postData.contentText,
        readingTime: readingTime,
        status: "DRAFT",
        published: false,
        featuredImage: postData.featuredImage || null,
        category: {
          connect: { id: postData.categoryId },
        },
        tags: {
          connectOrCreate: (postData.tags || []).map((tagTitle) => ({
            where: { title: tagTitle },
            create: { title: tagTitle },
          })),
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });

    // Verify the post was created
    console.log("Post created successfully:", { id: post.id, title: post.title, slug: post.slug });

    // Clear Next.js cache more aggressively
    revalidatePath("/admin/blog", "page");
    revalidatePath("/admin");

    return { success: true, post };
  } catch (error: any) {
    // Handle unique constraint violation for slug
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return { success: false, error: "A post with this title already exists" };
    }

    console.error("Error saving post:", error);
    return { success: false, error: "Failed to save post" };
  }
}

export async function updateBlogPost(
  id: string,
  postData: {
    title: string;
    contentHtml: string;
    contentJson: string;
    contentText: string;
    excerpt?: string;
    tags?: string[];
    categoryId?: string;
    featuredImage?: string | null;
  }
) {
  try {
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const wordCount = postData.contentText.split(/\s+/).filter((word) => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200);

    let contentJsonParsed;
    try {
      contentJsonParsed = JSON.parse(postData.contentJson);
    } catch (error) {
      console.error("Error parsing JSON content:", error);
      contentJsonParsed = { type: "doc", content: [] }; // Fallback
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: postData.title,
        slug: slug,
        excerpt: postData.excerpt || null,
        contentHtml: postData.contentHtml,
        contentJson: contentJsonParsed,
        contentText: postData.contentText,
        readingTime: readingTime,
        featuredImage: postData.featuredImage !== undefined ? postData.featuredImage : undefined,
        ...(postData.categoryId && {
          category: {
            connect: { id: postData.categoryId },
          },
        }),
        tags: {
          set: [], // First disconnect all existing tags
          connectOrCreate: (postData.tags || []).map((tagTitle) => ({
            where: { title: tagTitle },
            create: { title: tagTitle },
          })),
        },
        updatedAt: new Date(),
      },
    });

    // Clear Next.js cache more aggressively
    revalidatePath("/admin/blog", "page");
    revalidatePath("/admin");
    if (post.published) {
      revalidatePath(`/blog/${post.slug}`);
    }

    return { success: true, post };
  } catch (error: any) {
    // Handle unique constraint violation for slug
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return { success: false, error: "A post with this title already exists" };
    }

    console.error("Error updating post:", error);
    return { success: false, error: "Failed to update post" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const post = await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/"); // Revalidate homepage in case a published project was deleted
    return { success: true, post };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function publishBlogPost(id: string) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        status: "PUBLISHED",
        published: true,
        publishedAt: new Date(),
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/"); // Revalidate homepage to show newly published projects
    return { success: true, post };
  } catch (error) {
    console.error("Error publishing post:", error);
    return { success: false, error: "Failed to publish post" };
  }
}

export async function unpublishBlogPost(id: string) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        status: "DRAFT",
        published: false,
        publishedAt: null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/"); // Revalidate homepage to remove unpublished projects
    return { success: true, post };
  } catch (error) {
    console.error("Error unpublishing post:", error);
    return { success: false, error: "Failed to unpublish post" };
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        tags: true,
        category: true,
      },
    });

    console.log(post);

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    return { success: true, post };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}

export async function incrementBlogPostView(slug: string) {
  try {
    const post = await prisma.post.update({
      where: { slug: slug },
      data: { viewCount: { increment: 1 } },
    });

    return { success: true, viewCount: post.viewCount };
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return { success: false, error: "Failed to increment view count" };
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        tags: true,
        category: true,
      },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    return { success: true, post };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}

export async function createCategory(title: string) {
  try {
    const category = await prisma.category.create({
      data: {
        title: title.trim(),
      },
    });

    revalidatePath("/admin/blog");
    return { success: true, category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function setFeaturedBlogPost(id: string) {
  try {
    // First, unfeature all posts
    await prisma.post.updateMany({
      where: {
        featured: true,
      },
      data: {
        featured: false,
      },
    });

    // Then feature the selected post
    const post = await prisma.post.update({
      where: { id },
      data: {
        featured: true,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true, post };
  } catch (error) {
    console.error("Error featuring blog post:", error);
    return { success: false, error: "Failed to feature blog post" };
  }
}

export async function unfeatureBlogPost(id: string) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        featured: false,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true, post };
  } catch (error) {
    console.error("Error unfeaturing blog post:", error);
    return { success: false, error: "Failed to unfeature blog post" };
  }
}

export async function getFeaturedBlogPost() {
  try {
    const post = await prisma.post.findFirst({
      where: {
        featured: true,
        published: true,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error("Error fetching featured blog post:", error);
    return { success: false, error: "Failed to fetch featured blog post" };
  }
}
