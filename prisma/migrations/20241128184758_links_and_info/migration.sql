-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "mainRole" TEXT NOT NULL,
    "moto" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "linkedIn" TEXT NOT NULL,
    "x" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "infoId" INTEGER NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Info_userId_key" ON "Info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Links_infoId_key" ON "Links"("infoId");

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "Info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
