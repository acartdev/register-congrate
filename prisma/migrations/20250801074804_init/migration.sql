/*
  Warnings:

  - The values [นาง] on the enum `NamePrefix` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."NamePrefix_new" AS ENUM ('นาย', 'นางสาว');
ALTER TABLE "public"."Users" ALTER COLUMN "prefix" TYPE "public"."NamePrefix_new" USING ("prefix"::text::"public"."NamePrefix_new");
ALTER TYPE "public"."NamePrefix" RENAME TO "NamePrefix_old";
ALTER TYPE "public"."NamePrefix_new" RENAME TO "NamePrefix";
DROP TYPE "public"."NamePrefix_old";
COMMIT;
