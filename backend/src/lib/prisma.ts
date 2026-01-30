import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

// Initialize the Prisma Client with PostgreSQL adapter
const adapter = new PrismaPg({ connectionString });
// 'prisma' will be used to interact with the database
const prisma = new PrismaClient({ adapter });

export { prisma };
