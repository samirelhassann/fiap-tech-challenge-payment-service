/*
  Warnings:

  - You are about to drop the column `actual` on the `order_payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDetails` on the `order_payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `order_payment` table. All the data in the column will be lost.
  - Added the required column `payment_status` to the `order_payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_payment" DROP COLUMN "actual",
DROP COLUMN "paymentDetails",
DROP COLUMN "paymentStatus",
ADD COLUMN     "payment_details" TEXT,
ADD COLUMN     "payment_status" TEXT NOT NULL;
