-- CreateEnum
CREATE TYPE "public"."NamePrefix" AS ENUM ('นาย', 'นาง', 'นางสาว');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'STUDENT', 'TEACHER');

-- CreateEnum
CREATE TYPE "public"."Permission" AS ENUM ('ADMIN', 'STAFF_TEACHER', 'STAFF_STUDENT', 'VIEW');

-- CreateTable
CREATE TABLE "public"."Users" (
    "userID" TEXT NOT NULL,
    "prefix" "public"."NamePrefix" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "deptID" INTEGER NOT NULL,
    "role" "public"."UserRole",
    "permit" "public"."Permission",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "department" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");
