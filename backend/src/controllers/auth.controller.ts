import { Request, Response } from "express";
import { login } from "../services/auth.service";

export const iniciarSesion = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
      return;
    }

    const resultado = await login({
      email,
      password,
    });

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    if (
      error instanceof Error &&
      error.message === "CREDENCIALES_INVALIDAS"
    ) {
      res.status(401).json({
        message: "Email o contraseña incorrectos",
      });
      return;
    }

    res.status(500).json({
      message: "Error al iniciar sesión",
    });
  }
};