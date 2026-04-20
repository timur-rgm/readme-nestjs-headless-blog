-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('link', 'quote', 'photo', 'text', 'video');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "authorId" TEXT NOT NULL,
    "linkUrl" TEXT,
    "description" TEXT,
    "quote" TEXT,
    "quoteAuthor" TEXT,
    "title" TEXT,
    "announce" TEXT,
    "text" TEXT,
    "photoUrl" TEXT,
    "videoUrl" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_title_idx" ON "Post"("title");
