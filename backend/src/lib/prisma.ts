import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida");
}

const ca = fs.readFileSync(
  path.resolve(process.cwd(), "certs", "ca.pem"),
  "utf8"
);

const url = new URL(connectionString);

url.searchParams.delete("sslmode");

const adapter = new PrismaPg({
  connectionString: url.toString(),
  ssl: {
    ca,
    rejectUnauthorized: true,
  },
});

export const prisma = new PrismaClient({
  adapter,
});