/*
  Warnings:

  - The values [SUNDAY] on the enum `DayOfWeek` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DayOfWeek_new" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
ALTER TABLE "WorkingHour" ALTER COLUMN "dayOfWeek" TYPE "DayOfWeek_new" USING ("dayOfWeek"::text::"DayOfWeek_new");
ALTER TYPE "DayOfWeek" RENAME TO "DayOfWeek_old";
ALTER TYPE "DayOfWeek_new" RENAME TO "DayOfWeek";
DROP TYPE "DayOfWeek_old";
COMMIT;
