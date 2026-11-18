import { PrismaClient } from "@prisma/client";

declare global {
    var prismaBox: {
        prisma: PrismaClient | null,
    }
}

export {}