import StatCard from "../ui/StatCard";
import type { Usuario } from "../../services/api";

interface Props {
  usuarios: Usuario[];
}

function UsuariosResumen({ usuarios }: Props) {
  const administradores = usuarios.filter(
    (usuario) => usuario.rol === "ADMIN"
  ).length;

  const cajeros = usuarios.filter(
    (usuario) => usuario.rol === "CAJERO"
  ).length;

  const activos = usuarios.filter(
    (usuario) => usuario.activo
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total usuarios"
        value={usuarios.length}
        description="Usuarios registrados"
      />

      <StatCard
        title="Administradores"
        value={administradores}
        description="Acceso administrativo"
      />

      <StatCard
        title="Cajeros"
        value={cajeros}
        description="Personal de caja"
      />

      <StatCard
        title="Usuarios activos"
        value={activos}
        description="Con acceso habilitado"
        variant="success"
      />
    </div>
  );
}

export default UsuariosResumen;