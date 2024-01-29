/*
  Warnings:

  - You are about to drop the `_saved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_saved" DROP CONSTRAINT "_saved_A_fkey";

-- DropForeignKey
ALTER TABLE "_saved" DROP CONSTRAINT "_saved_B_fkey";

-- DropTable
DROP TABLE "_saved";

-- CreateTable
CREATE TABLE "SavedPost" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedPost_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
