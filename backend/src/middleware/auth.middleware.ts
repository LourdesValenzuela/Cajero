import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  usuarioId: string;
  rol: string;
}

export interface AuthRequest extends Request {
  usuario?: TokenPayload;
}

export const verificarToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Token no proporcionado",
    });
    return;
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({
      message: "JWT_SECRET no está configurado",
    });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as TokenPayload;

    req.usuario = {
      usuarioId: payload.usuarioId,
      rol: payload.rol,
    };

    next();
  } catch {
    res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
};
export const permitirRoles = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.usuario) {
      res.status(401).json({
        message: "Usuario no autenticado",
      });
      return;
    }

    if (!roles.includes(req.usuario.rol)) {
      res.status(403).json({
        message: "No tienes permisos para realizar esta acción",
      });
      return;
    }

    next();
  };
};