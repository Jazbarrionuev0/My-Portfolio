# Project Migration Guide: From Static to Database

## Summary of Changes

This migration updates your portfolio to fetch projects from your database (blog posts) instead of the static `projects.ts` file.

## Changes Made

### 1. New Database Functions (`src/actions/blog.ts`)
- **`getPublishedProjects()`**: Fetches all published blog posts to use as projects
- **`getLatestProject()`**: Fetches the most recently published project for the featured section

### 2. Updated Types (`src/types/types.ts`)
- Added **`DatabaseProject`** type that matches the Post model structure
- Keeps the original `Project` type for backward compatibility

### 3. Updated Components
- **`FilteredPortfolio`**: Now works with database projects instead of static data
  - Maps tags to categories automatically
  - Uses `featuredImage` from database or falls back to default
  - Links to `/blog/{slug}` instead of static project pages
  
- **`LatestProject`**: Now fetches the latest project from database
  - Uses async/await to fetch data
  - Maps first tag to a display category
  - Shows excerpt instead of description

### 4. Updated Main Page (`page.tsx`)
- Now fetches projects from database using `getPublishedProjects()`
- Handles empty states gracefully

## Database Requirements

Your blog posts (projects) should have:
- `published: true`
- `status: "PUBLISHED"`
- `featuredImage`: URL to project image
- `excerpt`: Short description for the project
- `tags`: Associated tags for category filtering

## Category Mapping

Tags are automatically mapped to categories:
- Tags with "data" or "science" → "Data Science"
- Tags with "computer" or "vision" → "Computer Vision"
- Tags with "nlp" or "natural language" → "NLP"
- Tags with "deep", "learning", or "neural" → "Deep Learning"
- Tags with "web", "frontend", "backend", or "fullstack" → "Web Development"
- Everything else → "Other"

## Suggested Schema Enhancements

Consider adding these fields to your Post model for better project representation:

```prisma
model Post {
  // ... existing fields
  repoUrl     String?  // GitHub repository URL
  demoUrl     String?  // Live demo URL
  projectType String?  // "project" | "blog" | "case-study"
  difficulty  String?  // "beginner" | "intermediate" | "advanced"
  
  // ... rest of model
}
```

## Migration Steps

1. ✅ Updated code to use database projects
2. Create some blog posts with projects
3. Add featured images to your posts
4. Add appropriate tags for category filtering
5. Set posts to published status

## Testing

To test the migration:
1. Create a few blog posts with `published: true` and `status: "PUBLISHED"`
2. Add `featuredImage` URLs
3. Add relevant tags
4. Visit your portfolio to see the database-driven projects

## Fallbacks

- If no projects are found, empty arrays are passed (graceful degradation)
- If no featured image is provided, defaults to `/projects/project2.jpg`
- If no excerpt is provided, shows "Click to read more about this project..."
