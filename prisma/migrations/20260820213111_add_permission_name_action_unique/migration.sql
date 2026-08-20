/*
  Warnings:

  - A unique constraint covering the columns `[name,action]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Permission_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_action_key" ON "Permission"("name", "action");
