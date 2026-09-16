import { Router } from "express";

import {
  obtenerCategorias,
  registrarCategoria,
} from "../controllers/categoria.controller";

import {
  verificarToken,
  permitirRoles,
} from "../middleware/auth.middleware";

const router = Router();

router.get("/", obtenerCategorias);

router.post(
  "/",
  verificarToken,
  permitirRoles("ADMIN"),
  registrarCategoria
);

export default router;