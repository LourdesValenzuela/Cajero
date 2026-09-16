import { Router } from "express";
import {
  obtenerUsuarios,
  registrarUsuario,
} from "../controllers/usuario.controller";
import {
  permitirRoles,
  verificarToken,
} from "../middleware/auth.middleware";

const router = Router();

router.use(verificarToken);

router.get(
  "/",
  permitirRoles("ADMIN"),
  obtenerUsuarios
);

router.post(
  "/",
  permitirRoles("ADMIN"),
  registrarUsuario
);

export default router;