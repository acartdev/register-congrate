/*
  Warnings:

  - You are about to drop the column `user_id` on the `Logs` table. All the data in the column will be lost.
  - Added the required column `deptID` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Logs" DROP CONSTRAINT "Logs_user_id_fkey";

-- DropIndex
DROP INDEX "public"."Logs_id_user_id_idx";

-- AlterTable
ALTER TABLE "public"."Logs" DROP COLUMN "user_id",
ADD COLUMN     "deptID" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Logs_id_deptID_idx" ON "public"."Logs"("id", "deptID");

-- AddForeignKey
ALTER TABLE "public"."Logs" ADD CONSTRAINT "Logs_deptID_fkey" FOREIGN KEY ("deptID") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
