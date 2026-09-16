import StatCard from "../ui/StatCard";
import type { Producto } from "../../services/api";
import { CircleCheck } from "lucide-react";

interface Props {
  productos: Producto[];
}

function ProductosResumen({ productos }: Props) {
  const activos = productos.filter(
    (producto) => producto.activo
  ).length;

  const stockBajo = productos.filter(
    (producto) =>
      producto.activo &&
      producto.stock > 0 &&
      producto.stock <= producto.stockMinimo
  ).length;

  const sinStock = productos.filter(
    (producto) =>
      producto.activo && producto.stock === 0
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total productos"
        value={productos.length}
        description="Registrados"
        icon="▦"
      />

      <StatCard
        title="Productos activos"
        value={activos}
        description="Disponibles para venta"
        icon={<CircleCheck size={20} />}
        variant="success"
        />

      <StatCard
        title="Stock bajo"
        value={stockBajo}
        description="Requieren reposición"
        icon="!"
        variant="warning"
      />

      <StatCard
        title="Sin stock"
        value={sinStock}
        description="No disponibles"
        icon="×"
        variant="danger"
      />
    </div>
  );
}

export default ProductosResumen;