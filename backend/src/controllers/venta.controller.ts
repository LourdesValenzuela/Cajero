import { Request, Response } from "express";
import {
  crearVenta,
  listarVentas,
  buscarVentaPorId,
} from "../services/venta.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const registrarVenta = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { montoRecibido, items } = req.body;

    // El usuario ya no viene en el body.
    // Lo obtenemos del JWT.
    const usuarioId = req.usuario?.usuarioId;

    if (!usuarioId) {
      res.status(401).json({
        message: "Usuario no autenticado",
      });
      return;
    }

    if (montoRecibido === undefined || !Array.isArray(items)) {
      res.status(400).json({
        message: "montoRecibido e items son obligatorios",
      });
      return;
    }

    if (
      typeof montoRecibido !== "number" ||
      montoRecibido < 0
    ) {
      res.status(400).json({
        message: "El monto recibido debe ser un número válido",
      });
      return;
    }

    const venta = await crearVenta({
      usuarioId,
      montoRecibido,
      items,
    });

    res.status(201).json(venta);
  } catch (error) {
    console.error("Error al registrar venta:", error);

    if (error instanceof Error) {
      if (error.message === "USUARIO_INVALIDO") {
        res.status(400).json({
          message: "El usuario no existe o está inactivo",
        });
        return;
      }

      if (error.message === "VENTA_SIN_PRODUCTOS") {
        res.status(400).json({
          message: "La venta debe contener al menos un producto",
        });
        return;
      }

      if (error.message === "CANTIDAD_INVALIDA") {
        res.status(400).json({
          message: "La cantidad debe ser un número entero mayor a cero",
        });
        return;
      }

      if (error.message === "PRODUCTO_INVALIDO") {
        res.status(400).json({
          message: "Uno de los productos no existe o está inactivo",
        });
        return;
      }

      if (error.message.startsWith("STOCK_INSUFICIENTE:")) {
        const producto = error.message.split(":")[1];

        res.status(400).json({
          message: `Stock insuficiente para ${producto}`,
        });
        return;
      }

      if (error.message === "MONTO_INSUFICIENTE") {
        res.status(400).json({
          message: "El monto recibido es menor al total de la venta",
        });
        return;
      }
    }

    res.status(500).json({
      message: "Error al registrar la venta",
    });
  }
};

export const obtenerVentas = async (
  req: Request,
  res: Response
) => {
  try {
    const ventas = await listarVentas();

    res.status(200).json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);

    res.status(500).json({
      message: "Error al obtener las ventas",
    });
  }
};

export const obtenerVentaPorId = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const venta = await buscarVentaPorId(req.params.id);

    if (!venta) {
      res.status(404).json({
        message: "Venta no encontrada",
      });
      return;
    }

    res.status(200).json(venta);
  } catch (error) {
    console.error("Error al obtener venta:", error);

    res.status(500).json({
      message: "Error al obtener la venta",
    });
  }
};