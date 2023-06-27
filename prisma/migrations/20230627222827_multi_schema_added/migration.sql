-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "knowledge";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "profile";

-- CreateEnum
CREATE TYPE "profile"."Role" AS ENUM ('USER', 'BOT');

-- CreateTable
CREATE TABLE "profile"."User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creationDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "profile"."Person" (
    "personId" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobPositionId" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "profile"."JobPosition" (
    "jobPositionId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("jobPositionId")
);

-- CreateTable
CREATE TABLE "profile"."Department" (
    "departmentId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("departmentId")
);

-- CreateTable
CREATE TABLE "profile"."Conversation" (
    "conversationId" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("conversationId")
);

-- CreateTable
CREATE TABLE "profile"."Message" (
    "messageId" SERIAL NOT NULL,
    "role" "profile"."Role" NOT NULL,
    "text" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "entities" JSONB NOT NULL,
    "timestamp" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "profile"."Fallback" (
    "fallbackId" SERIAL NOT NULL,
    "reviewed" BOOLEAN NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "Fallback_pkey" PRIMARY KEY ("fallbackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "profile"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Person_userId_key" ON "profile"."Person"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_personId_key" ON "profile"."Conversation"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Fallback_messageId_key" ON "profile"."Fallback"("messageId");

-- AddForeignKey
ALTER TABLE "profile"."Person" ADD CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile"."Person" ADD CONSTRAINT "Person_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "profile"."JobPosition"("jobPositionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile"."JobPosition" ADD CONSTRAINT "JobPosition_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "profile"."Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile"."Conversation" ADD CONSTRAINT "Conversation_personId_fkey" FOREIGN KEY ("personId") REFERENCES "profile"."Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile"."Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "profile"."Conversation"("conversationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile"."Fallback" ADD CONSTRAINT "Fallback_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "profile"."Message"("messageId") ON DELETE RESTRICT ON UPDATE CASCADE;
