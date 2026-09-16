import { Request, Response } from "express";
import { Rol } from "../generated/prisma/enums";
import {
  crearUsuario,
  listarUsuarios,
} from "../services/usuario.service";

export const obtenerUsuarios = async (
  req: Request,
  res: Response
) => {
  try {
    const usuarios = await listarUsuarios();

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);

    res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
};

export const registrarUsuario = async (
  req: Request,
  res: Response
) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body;

    if (!nombre || !apellido || !email || !password || !rol) {
      res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
      return;
    }

    if (!Object.values(Rol).includes(rol)) {
      res.status(400).json({
        message: "El rol debe ser ADMIN o CAJERO",
      });
      return;
    }

    const usuario = await crearUsuario({
      nombre,
      apellido,
      email,
      password,
      rol,
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);

    res.status(500).json({
      message: "Error al crear el usuario",
    });
  }
};