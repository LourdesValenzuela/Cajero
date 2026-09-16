import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida");
}

const url = new URL(connectionString);
url.searchParams.delete("sslmode");

const rutaCertificado = process.env.RENDER
  ? "/etc/secrets/ca.pem"
  : path.resolve(process.cwd(), "certs", "ca.pem");

const ca = fs.readFileSync(
  rutaCertificado,
  "utf8"
);

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