import { useEffect, useMemo, useState } from "react";

import VentasHeader from "../components/ventas/VentasHeader";
import VentasResumen from "../components/ventas/VentasResumen";
import VentasTable from "../components/ventas/VentasTable";
import VentasSkeleton from "../components/ventas/VentasSkeleton";
import VentaDetalle from "../components/ventas/VentaDetalle";

import { obtenerVentas } from "../services/api";
import type { Venta } from "../services/api";

function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventaSeleccionada, setVentaSeleccionada] =
    useState<Venta | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        const data = await obtenerVentas();

        setVentas(data);

        if (data.length > 0) {
          setVentaSeleccionada(data[0]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, []);

  const ventasFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return ventas;
    }

    return ventas.filter((venta) => {
      const cajero =
        `${venta.usuario.nombre} ${venta.usuario.apellido}`.toLowerCase();

      const coincideCajero =
        cajero.includes(texto);

      const coincideProducto =
        venta.detalles.some((detalle) =>
          detalle.producto.nombre
            .toLowerCase()
            .includes(texto)
        );

      return coincideCajero || coincideProducto;
    });
  }, [ventas, busqueda]);

  if (cargando) {
    return <VentasSkeleton />;
  }

  return (
    <div className="space-y-5">
      <VentasHeader
        busqueda={busqueda}
        cantidadResultados={ventasFiltradas.length}
        onBusquedaChange={setBusqueda}
      />

      <VentasResumen ventas={ventas} />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_380px]">
        <VentasTable
          ventas={ventasFiltradas}
          ventaSeleccionada={ventaSeleccionada}
          onSeleccionar={setVentaSeleccionada}
        />

        <VentaDetalle
          venta={ventaSeleccionada}
        />
      </div>
    </div>
  );
}

export default VentasPage;