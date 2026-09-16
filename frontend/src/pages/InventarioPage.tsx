import { useEffect, useState } from "react";

import InventarioHeader from "../components/inventario/InventarIoHeader";
import SelectorProducto from "../components/inventario/SelectorProducto";
import EntradaStockCard from "../components/inventario/EntradaStockCard";
import AjusteStockCard from "../components/inventario/AjusteStockCard";
import MovimientoStockTable from "../components/inventario/MovimientoStockTable";
import InventarioSkeleton from "../components/inventario/InventarioSkeleton";
import { CircleCheck } from "lucide-react";

import {
  obtenerMovimientosStock,
  obtenerProductos,
  registrarAjusteStock,
  registrarEntradaStock,
} from "../services/api";

import type {
  MovimientoStock,
  Producto,
} from "../services/api";

function InventarioPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [movimientos, setMovimientos] =
    useState<MovimientoStock[]>([]);

  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [nuevoStock, setNuevoStock] = useState("");
  const [motivoEntrada, setMotivoEntrada] = useState("");
  const [motivoAjuste, setMotivoAjuste] = useState("");

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      setError("");

      const [productosData, movimientosData] =
        await Promise.all([
          obtenerProductos(),
          obtenerMovimientosStock(),
        ]);

      setProductos(productosData);
      setMovimientos(movimientosData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const crearEntrada = async () => {
    setError("");
    setMensaje("");

    if (!productoId) {
      setError("Selecciona un producto");
      return;
    }

    const cantidadNumero = Number(cantidad);

    if (
      !Number.isInteger(cantidadNumero) ||
      cantidadNumero <= 0
    ) {
      setError("Ingresa una cantidad válida");
      return;
    }

    try {
      await registrarEntradaStock(
        productoId,
        cantidadNumero,
        motivoEntrada
      );

      setMensaje(
        "Entrada de stock registrada correctamente"
      );

      setCantidad("");
      setMotivoEntrada("");

      await cargarDatos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const crearAjuste = async () => {
    setError("");
    setMensaje("");

    if (!productoId) {
      setError("Selecciona un producto");
      return;
    }

    if (!motivoAjuste.trim()) {
      setError("El motivo del ajuste es obligatorio");
      return;
    }

    const stockNumero = Number(nuevoStock);

    if (
      !Number.isInteger(stockNumero) ||
      stockNumero < 0
    ) {
      setError("Ingresa un stock válido");
      return;
    }

    try {
      await registrarAjusteStock(
        productoId,
        stockNumero,
        motivoAjuste
      );

      setMensaje("Stock ajustado correctamente");

      setNuevoStock("");
      setMotivoAjuste("");

      await cargarDatos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (cargando) {
    return <InventarioSkeleton />;
  }

  return (
    <div className="space-y-5">
      <InventarioHeader />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {mensaje && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
            <CircleCheck
            size={17}
            className="shrink-0"
            />
            <span>{mensaje}</span>
        </div>
        )}

      <SelectorProducto
        productos={productos}
        productoId={productoId}
        onChange={setProductoId}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <EntradaStockCard
            cantidad={cantidad}
            motivo={motivoEntrada}
            onCantidadChange={setCantidad}
            onMotivoChange={setMotivoEntrada}
            onRegistrar={crearEntrada}
        />

        <AjusteStockCard
            nuevoStock={nuevoStock}
            motivo={motivoAjuste}
            onStockChange={setNuevoStock}
            onMotivoChange={setMotivoAjuste}
            onAjustar={crearAjuste}
        />
        </div>

        <MovimientoStockTable
        movimientos={movimientos}
        />
    </div>
  );
}

export default InventarioPage;