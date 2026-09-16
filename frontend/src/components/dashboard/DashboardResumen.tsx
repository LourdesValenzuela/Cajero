import {
  Banknote,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import StatCard from "../ui/StatCard";

interface Props {
  ventasHoy: number;
  totalVendidoHoy: number;
  productos: number;
  usuariosActivos: number;
}

function DashboardResumen({
  ventasHoy,
  totalVendidoHoy,
  productos,
  usuariosActivos,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Ventas de hoy"
        value={ventasHoy}
        description="Operaciones completadas"
        icon={<ShoppingCart size={20} />}
      />

      <StatCard
        title="Vendido hoy"
        value={`${totalVendidoHoy.toLocaleString("es-PY")} Gs.`}
        description="Total de ventas completadas"
        icon={<Banknote size={20} />}
        variant="success"
      />

      <StatCard
        title="Productos"
        value={productos}
        description="Productos registrados"
        icon={<Package size={20} />}
      />

      <StatCard
        title="Usuarios activos"
        value={usuariosActivos}
        description="Usuarios habilitados"
        icon={<Users size={20} />}
      />
    </div>
  );
}

export default DashboardResumen;