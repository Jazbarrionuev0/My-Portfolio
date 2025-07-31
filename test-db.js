const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log("Testing database connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Test fetching posts
    console.log("Testing getAllBlogPosts query...");
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    console.log("✅ Query successful");
    console.log(`Found ${posts.length} posts`);

    if (posts.length > 0) {
      console.log("Sample post:", JSON.stringify(posts[0], null, 2));
    }

    // Test creating a tag
    console.log("Testing tag creation...");
    const tag = await prisma.tag.create({
      data: {
        title: "test-tag",
      },
    });
    console.log("✅ Tag created:", tag);

    // Test creating a post with tags
    console.log("Testing post creation with tags...");
    const post = await prisma.post.create({
      data: {
        title: "Test Post",
        slug: "test-post-" + Date.now(),
        contentHtml: "<p>Test content</p>",
        contentJson: { type: "doc", content: [] },
        contentText: "Test content",
        readingTime: 1,
        tags: {
          connect: [{ id: tag.id }],
          connectOrCreate: [
            { where: { title: "javascript" }, create: { title: "javascript" } },
            { where: { title: "react" }, create: { title: "react" } },
          ],
        },
      },
      include: { tags: true },
    });

    console.log("✅ Post created with tags:", JSON.stringify(post, null, 2));

    // Test fetching again
    const updatedPosts = await prisma.post.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    console.log("✅ Final query successful");
    console.log(`Found ${updatedPosts.length} posts after creation`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
