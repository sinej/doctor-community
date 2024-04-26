/*
  Warnings:

  - You are about to drop the column `price` on the `Community` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Community" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Community_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Community" ("created_at", "description", "id", "photo", "title", "updated_at", "userId") SELECT "created_at", "description", "id", "photo", "title", "updated_at", "userId" FROM "Community";
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
