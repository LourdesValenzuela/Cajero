import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardResumen from "../components/dashboard/DashboardResumen";
import UltimasVentas from "../components/dashboard/UltimasVentas";
import AccesosRapidos from "../components/dashboard/AccesosRapidos";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

import {
  obtenerProductos,
  obtenerUsuarios,
  obtenerVentas,
} from "../services/api";

import type {
  Producto,
  Usuario,
  Venta,
} from "../services/api";

function DashboardPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        setError("");

        const [
          ventasData,
          productosData,
          usuariosData,
        ] = await Promise.all([
          obtenerVentas(),
          obtenerProductos(),
          obtenerUsuarios(),
        ]);

        setVentas(ventasData);
        setProductos(productosData);
        setUsuarios(usuariosData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setCargando(false);
      }
    };

    cargarDashboard();
  }, []);

  const ventasHoy = useMemo(() => {
    const hoy = new Date();

    return ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);

      return (
        venta.estado === "COMPLETADA" &&
        fechaVenta.getFullYear() === hoy.getFullYear() &&
        fechaVenta.getMonth() === hoy.getMonth() &&
        fechaVenta.getDate() === hoy.getDate()
      );
    });
  }, [ventas]);

  const totalVendidoHoy = useMemo(() => {
    return ventasHoy.reduce(
      (total, venta) =>
        total + Number(venta.total),
      0
    );
  }, [ventasHoy]);

  const productosActivos = productos.filter(
    (producto) => producto.activo
  ).length;

  const usuariosActivos = usuarios.filter(
    (usuario) => usuario.activo
  ).length;

  if (cargando) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-5">
      <DashboardHeader />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <DashboardResumen
        ventasHoy={ventasHoy.length}
        totalVendidoHoy={totalVendidoHoy}
        productos={productosActivos}
        usuariosActivos={usuariosActivos}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <UltimasVentas ventas={ventas} />

        <AccesosRapidos />
      </div>
    </div>
  );
}

export default DashboardPage;