import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Usuario {
  rol: "ADMIN" | "CAJERO";
}

interface Props {
  children: ReactNode;
  rolesPermitidos: Usuario["rol"][];
}

function RoleProtectedRoute({
  children,
  rolesPermitidos,
}: Props) {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return <Navigate to="/login" replace />;
  }

  try {
    const usuario: Usuario = JSON.parse(usuarioGuardado);

    if (!rolesPermitidos.includes(usuario.rol)) {
      return <Navigate to="/caja" replace />;
    }

    return children;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    return <Navigate to="/login" replace />;
  }
}

export default RoleProtectedRoute;