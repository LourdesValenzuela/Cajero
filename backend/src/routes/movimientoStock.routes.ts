import { Router } from "express";
import {
  crearAjusteStock,
  crearEntradaStock,
  obtenerMovimientos,
} from "../controllers/movimientoStock.controller";

import {
  verificarToken,
  permitirRoles,
} from "../middleware/auth.middleware";

const router = Router();

router.use(verificarToken);

router.get("/", obtenerMovimientos);

router.post(
  "/entrada",
  permitirRoles("ADMIN"),
  crearEntradaStock
);

router.post(
  "/ajuste",
  permitirRoles("ADMIN"),
  crearAjusteStock
);

export default router;