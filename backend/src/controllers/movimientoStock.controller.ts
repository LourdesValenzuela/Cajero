import { Response } from "express";
import {
  ajustarStock,
  listarMovimientos,
  registrarEntradaStock,
} from "../services/movimientoStock.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const obtenerMovimientos = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const movimientos = await listarMovimientos();

    res.status(200).json(movimientos);
  } catch (error) {
    console.error("Error al obtener movimientos:", error);

    res.status(500).json({
      message: "Error al obtener los movimientos",
    });
  }
};

export const crearEntradaStock = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { productoId, cantidad, motivo } = req.body;

    // El usuario se obtiene del JWT
    const usuarioId = req.usuario?.usuarioId;

    if (!usuarioId) {
      res.status(401).json({
        message: "Usuario no autenticado",
      });
      return;
    }

    if (!productoId || cantidad === undefined) {
      res.status(400).json({
        message: "productoId y cantidad son obligatorios",
      });
      return;
    }

    const resultado = await registrarEntradaStock({
      productoId,
      usuarioId,
      cantidad,
      motivo,
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error al registrar entrada:", error);

    if (error instanceof Error) {
      if (error.message === "CANTIDAD_INVALIDA") {
        res.status(400).json({
          message: "La cantidad debe ser un entero mayor a cero",
        });
        return;
      }

      if (error.message === "PRODUCTO_INVALIDO") {
        res.status(400).json({
          message: "El producto no existe o está inactivo",
        });
        return;
      }

      if (error.message === "USUARIO_INVALIDO") {
        res.status(400).json({
          message: "El usuario no existe o está inactivo",
        });
        return;
      }
    }

    res.status(500).json({
      message: "Error al registrar la entrada de stock",
    });
  }
};

export const crearAjusteStock = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      productoId,
      nuevoStock,
      motivo,
    } = req.body;

    // El usuario se obtiene del JWT
    const usuarioId = req.usuario?.usuarioId;

    if (!usuarioId) {
      res.status(401).json({
        message: "Usuario no autenticado",
      });
      return;
    }

    if (
      !productoId ||
      nuevoStock === undefined ||
      !motivo
    ) {
      res.status(400).json({
        message: "productoId, nuevoStock y motivo son obligatorios",
      });
      return;
    }

    const resultado = await ajustarStock({
      productoId,
      usuarioId,
      nuevoStock,
      motivo,
    });

    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error al ajustar stock:", error);

    if (error instanceof Error) {
      if (error.message === "STOCK_INVALIDO") {
        res.status(400).json({
          message: "El nuevo stock debe ser un entero mayor o igual a cero",
        });
        return;
      }

      if (error.message === "MOTIVO_OBLIGATORIO") {
        res.status(400).json({
          message: "Debe indicar el motivo del ajuste",
        });
        return;
      }

      if (error.message === "PRODUCTO_INVALIDO") {
        res.status(400).json({
          message: "El producto no existe o está inactivo",
        });
        return;
      }

      if (error.message === "USUARIO_INVALIDO") {
        res.status(400).json({
          message: "El usuario no existe o está inactivo",
        });
        return;
      }
    }

    res.status(500).json({
      message: "Error al ajustar el stock",
    });
  }
};