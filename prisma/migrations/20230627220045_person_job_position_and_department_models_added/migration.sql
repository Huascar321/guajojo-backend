-- CreateTable
CREATE TABLE "Person" (
    "personId" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobPositionId" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "JobPosition" (
    "jobPositionId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("jobPositionId")
);

-- CreateTable
CREATE TABLE "department" (
    "departmentId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("departmentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_userId_key" ON "Person"("userId");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "JobPosition"("jobPositionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosition" ADD CONSTRAINT "JobPosition_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
