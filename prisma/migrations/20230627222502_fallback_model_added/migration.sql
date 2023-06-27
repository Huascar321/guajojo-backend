-- CreateTable
CREATE TABLE "Fallback" (
    "fallbackId" SERIAL NOT NULL,
    "reviewed" BOOLEAN NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "Fallback_pkey" PRIMARY KEY ("fallbackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fallback_messageId_key" ON "Fallback"("messageId");

-- AddForeignKey
ALTER TABLE "Fallback" ADD CONSTRAINT "Fallback_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("messageId") ON DELETE RESTRICT ON UPDATE CASCADE;
