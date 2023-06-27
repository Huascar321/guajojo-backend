-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'BOT');

-- CreateTable
CREATE TABLE "Conversation" (
    "conversationId" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("conversationId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "text" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "entities" JSONB NOT NULL,
    "timestamp" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_personId_key" ON "Conversation"("personId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("conversationId") ON DELETE RESTRICT ON UPDATE CASCADE;
