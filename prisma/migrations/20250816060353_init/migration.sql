/*
  Warnings:

  - You are about to drop the column `department` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "department";

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_deptID_fkey" FOREIGN KEY ("deptID") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
