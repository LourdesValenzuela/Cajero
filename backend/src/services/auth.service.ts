import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!usuario || !usuario.activo) {
    throw new Error("CREDENCIALES_INVALIDAS");
  }

  const passwordValido = await bcrypt.compare(
    data.password,
    usuario.password
  );

  if (!passwordValido) {
    throw new Error("CREDENCIALES_INVALIDAS");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET_NO_CONFIGURADO");
  }

  const token = jwt.sign(
    {
      usuarioId: usuario.id,
      rol: usuario.rol,
    },
    secret,
    {
      expiresIn: "8h",
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol,
    },
  };
};