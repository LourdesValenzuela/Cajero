import { Router } from "express";

import {
  obtenerProductoPorCodigo,
  obtenerProductos,
  registrarProducto,
  obtenerProductosStockBajo,
} from "../controllers/producto.controller";

import {
  verificarToken,
  permitirRoles,
} from "../middleware/auth.middleware";

const router = Router();

router.get("/", obtenerProductos);

router.get("/codigo/:codigo", obtenerProductoPorCodigo);

router.post(
  "/",
  verificarToken,
  permitirRoles("ADMIN"),
  registrarProducto
);

router.get("/stock-bajo", obtenerProductosStockBajo);

export default router;