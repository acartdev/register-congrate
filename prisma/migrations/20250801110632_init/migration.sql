/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "uuid" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Users_uuid_key" ON "public"."Users"("uuid");
