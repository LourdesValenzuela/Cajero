import StatCard from "../ui/StatCard";
import type { Venta } from "../../services/api";
import { CircleCheck } from "lucide-react";

interface Props {
  ventas: Venta[];
}

const formatearGs = (valor: number) =>
  valor.toLocaleString("es-PY");

function VentasResumen({ ventas }: Props) {
  const completadas = ventas.filter(
    (venta) => venta.estado === "COMPLETADA"
  );

  const totalVendido = completadas.reduce(
    (total, venta) => total + Number(venta.total),
    0
  );

  const productosVendidos = completadas.reduce(
    (total, venta) =>
      total +
      venta.detalles.reduce(
        (subtotal, detalle) =>
          subtotal + detalle.cantidad,
        0
      ),
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Ventas completadas"
        value={completadas.length}
        description="Operaciones registradas"
        icon={<CircleCheck size={20} />}
        variant="success"
        />

      <StatCard
        title="Total vendido"
        value={`${formatearGs(totalVendido)} Gs.`}
        description="Ingresos registrados"
        icon="₲"
      />

      <StatCard
        title="Productos vendidos"
        value={productosVendidos}
        description="Unidades vendidas"
        icon="▦"
      />
    </div>
  );
}

export default VentasResumen;