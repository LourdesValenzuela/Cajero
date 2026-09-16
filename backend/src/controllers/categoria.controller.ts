import { Request, Response } from "express";
import {
  crearCategoria,
  listarCategorias,
} from "../services/categoria.service";

export const obtenerCategorias = async (
  req: Request,
  res: Response
) => {
  try {
    const categorias = await listarCategorias();

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las categorías",
    });
  }
};

export const registrarCategoria = async (
  req: Request,
  res: Response
) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      res.status(400).json({
        message: "El nombre es obligatorio",
      });
      return;
    }

    const categoria = await crearCategoria({
      nombre,
      descripcion,
    });

    res.status(201).json(categoria);
    }catch (error) {
    console.error("Error al crear categoría:", error);

    res.status(500).json({
        message: "Error al crear la categoría",
    });
    }
};