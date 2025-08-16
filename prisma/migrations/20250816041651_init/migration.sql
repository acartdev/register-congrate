-- CreateTable
CREATE TABLE "public"."RegisterActivity" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegisterActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."RegisterActivity" ADD CONSTRAINT "RegisterActivity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegisterActivity" ADD CONSTRAINT "RegisterActivity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
