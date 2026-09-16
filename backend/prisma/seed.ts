import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma";

const main = async () => {
  const email =
    process.env.SEED_ADMIN_EMAIL || "admin@gmail.com";

  const password =
    process.env.SEED_ADMIN_PASSWORD || "Admin123";

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.usuario.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      nombre: "Administrador",
      apellido: "Cajero",
      email,
      password: passwordHash,
      rol: "ADMIN",
      activo: true,
    },
  });

  console.log("Administrador inicial disponible:");
  console.log(`Email: ${admin.email}`);
  console.log(`Contraseña: ${password}`);
};

main()
  .catch((error) => {
    console.error("Error al crear el administrador:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });