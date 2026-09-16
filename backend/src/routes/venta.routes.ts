import { Router } from "express";
import {
  obtenerVentaPorId,
  obtenerVentas,
  registrarVenta,
} from "../controllers/venta.controller";
import { verificarToken } from "../middleware/auth.middleware";

const router = Router();

router.use(verificarToken);

router.get("/", obtenerVentas);
router.get("/:id", obtenerVentaPorId);
router.post("/", registrarVenta);

export default router;