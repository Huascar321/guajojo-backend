-- CreateTable
CREATE TABLE "knowledge"."Intent" (
    "intentId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Intent_pkey" PRIMARY KEY ("intentId")
);

-- CreateTable
CREATE TABLE "knowledge"."Entity" (
    "entityId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "memory" BOOLEAN NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "knowledge"."Response" (
    "responseId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("responseId")
);

-- CreateTable
CREATE TABLE "knowledge"."Story" (
    "storyId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("storyId")
);

-- CreateTable
CREATE TABLE "knowledge"."Document" (
    "documentId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId")
);
