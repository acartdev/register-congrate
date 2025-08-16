-- CreateEnum
CREATE TYPE "public"."NamePrefix" AS ENUM ('นาย', 'นางสาว');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'STUDENT', 'TEACHER');

-- CreateEnum
CREATE TYPE "public"."Permission" AS ENUM ('ADMIN', 'STAFF_TEACHER', 'STAFF_STUDENT', 'VIEW');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "uuid" UUID,
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
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "attachment" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RegisterActivity" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegisterActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "public"."Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userID_key" ON "public"."Users"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Users_uuid_key" ON "public"."Users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- AddForeignKey
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_deptID_fkey" FOREIGN KEY ("deptID") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegisterActivity" ADD CONSTRAINT "RegisterActivity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegisterActivity" ADD CONSTRAINT "RegisterActivity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
