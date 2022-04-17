-- CreateTable
CREATE TABLE "HomesLikedByUsers" (
    "homeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HomesLikedByUsers_pkey" PRIMARY KEY ("homeId","userId")
);

-- AddForeignKey
ALTER TABLE "HomesLikedByUsers" ADD CONSTRAINT "HomesLikedByUsers_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomesLikedByUsers" ADD CONSTRAINT "HomesLikedByUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
