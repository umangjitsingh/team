import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

if (!global.prismaBox) {
  global.prismaBox = {
    prisma: null,
  }
}

if (!global.prismaBox.prisma) {
  global.prismaBox.prisma = new PrismaClient({ adapter });
}

export const db = global.prismaBox.prisma;
