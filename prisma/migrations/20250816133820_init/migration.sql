-- CreateEnum
CREATE TYPE "public"."CURD" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "public"."Logs" (
    "id" SERIAL NOT NULL,
    "type" "public"."CURD" NOT NULL,
    "message" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Logs_id_user_id_idx" ON "public"."Logs"("id", "user_id");

-- CreateIndex
CREATE INDEX "Activity_id_name_user_id_idx" ON "public"."Activity"("id", "name", "user_id");

-- CreateIndex
CREATE INDEX "Department_id_name_idx" ON "public"."Department"("id", "name");

-- CreateIndex
CREATE INDEX "RegisterActivity_id_activity_id_user_id_idx" ON "public"."RegisterActivity"("id", "activity_id", "user_id");

-- CreateIndex
CREATE INDEX "Users_uuid_userID_id_email_idx" ON "public"."Users"("uuid", "userID", "id", "email");

-- AddForeignKey
ALTER TABLE "public"."Logs" ADD CONSTRAINT "Logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
