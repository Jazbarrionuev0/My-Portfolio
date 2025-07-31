/*
  Warnings:

  - You are about to drop the column `tags` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "public"."tags" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "public"."tags"("title");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "public"."_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "public"."_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
