-- CreateTable
CREATE TABLE "order_payment" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "total_amount" DECIMAL(65,30) NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "paymentDetails" TEXT,
    "actual" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "order_payment_pkey" PRIMARY KEY ("id")
);
