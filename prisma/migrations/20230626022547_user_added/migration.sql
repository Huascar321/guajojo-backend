-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creationDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
