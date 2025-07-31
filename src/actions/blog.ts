"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllBlogPosts() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        status: true,
        published: true,
        publishedAt: true,
        readingTime: true,
        viewCount: true,
        featuredImage: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
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

export async function saveBlogPost(postData: {
  title: string;
  contentHtml: string;
  contentJson: string;
  contentText: string;
  excerpt?: string;
  tags?: string[];
}) {
  try {
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return { success: false, error: "A post with this title already exists" };
    }

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
        tags: postData.tags || [],
      },
    });

    revalidatePath("/admin/blog");
    return { success: true, post };
  } catch (error) {
    console.error("Error saving post:", error);
    return { success: false, error: "Failed to save post" };
  }
}

export async function updateBlogPost(
  id: string,
  postData: { title: string; contentHtml: string; contentJson: string; contentText: string; excerpt?: string; tags?: string[] }
) {
  try {
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug already exists for another post
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost && existingPost.id !== id) {
      return { success: false, error: "A post with this title already exists" };
    }

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
        tags: postData.tags || [],
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, post };
  } catch (error) {
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
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        contentHtml: true,
        contentJson: true,
        contentText: true,
        status: true,
        published: true,
        publishedAt: true,
        readingTime: true,
        viewCount: true,
        featuredImage: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(post);

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    // Increment view count
    await prisma.post.update({
      where: { slug: slug },
      data: { viewCount: { increment: 1 } },
    });

    return { success: true, post: { ...post, viewCount: post.viewCount + 1 } };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        contentHtml: true,
        contentJson: true,
        contentText: true,
        status: true,
        published: true,
        publishedAt: true,
        readingTime: true,
        viewCount: true,
        featuredImage: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
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
