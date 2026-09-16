import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { Rol } from "../generated/prisma/enums";

interface CrearUsuarioData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Rol;
}

export const listarUsuarios = async () => {
  return prisma.usuario.findMany({
    select: {
      id: true,
      nombre: true,
      apellido: true,
      email: true,
      rol: true,
      activo: true,
      creadoEn: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });
};

export const crearUsuario = async (data: CrearUsuarioData) => {
  const passwordHash = await bcrypt.hash(data.password, 10);

  return prisma.usuario.create({
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password: passwordHash,
      rol: data.rol,
    },
    select: {
      id: true,
      nombre: true,
      apellido: true,
      email: true,
      rol: true,
      activo: true,
      creadoEn: true,
    },
  });
};