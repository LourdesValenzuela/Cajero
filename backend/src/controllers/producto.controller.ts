import { Request, Response } from "express";
import {
  buscarProductoPorCodigo,
  crearProducto,
  listarProductos,
  listarProductosStockBajo,
} from "../services/producto.service";

export const obtenerProductos = async (
  req: Request,
  res: Response
) => {
  try {
    const productos = await listarProductos();

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);

    res.status(500).json({
      message: "Error al obtener los productos",
    });
  }
};

export const obtenerProductoPorCodigo = async (
  req: Request<{ codigo: string }>,
  res: Response
) => {
  try {
    const { codigo } = req.params;

    const producto = await buscarProductoPorCodigo(codigo);

    if (!producto) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al buscar producto:", error);

    res.status(500).json({
      message: "Error al buscar el producto",
    });
  }
};

export const registrarProducto = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      codigoBarras,
      nombre,
      precio,
      stock,
      stockMinimo,
      categoriaId,
    } = req.body;

    if (
      !codigoBarras ||
      !nombre ||
      precio === undefined ||
      stock === undefined ||
      stockMinimo === undefined ||
      !categoriaId
    ) {
      res.status(400).json({
        message: "Todos los campos obligatorios deben ser enviados",
      });
      return;
    }

    if (precio < 0 || stock < 0 || stockMinimo < 0) {
      res.status(400).json({
        message: "Precio y cantidades no pueden ser negativos",
      });
      return;
    }

    const producto = await crearProducto({
      codigoBarras,
      nombre,
      precio,
      stock,
      stockMinimo,
      categoriaId,
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error("Error al crear producto:", error);

    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
};

export const obtenerProductosStockBajo = async (
  req: Request,
  res: Response
) => {
  try {
    const productos = await listarProductosStockBajo();

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener stock bajo:", error);

    res.status(500).json({
      message: "Error al obtener productos con stock bajo",
    });
  }
};