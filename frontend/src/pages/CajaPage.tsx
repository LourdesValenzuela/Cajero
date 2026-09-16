import { useCallback, useState } from "react";

import BuscadorProducto from "../components/caja/BuscadorProducto";
import CarritoVenta from "../components/caja/CarritoVenta";
import ResumenCobro from "../components/caja/ResumenCobro";
import EscanerCodigoBarras from "../components/caja/EscanearCodigoBarras";

import type { ProductoCarrito } from "../components/caja/types";

import {
  buscarProductoPorCodigo,
  registrarVenta,
} from "../services/api";

function CajaPage() {
  const [codigo, setCodigo] = useState("");
  const [carrito, setCarrito] =
    useState<ProductoCarrito[]>([]);
  const [montoRecibido, setMontoRecibido] =
    useState("");

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [procesando, setProcesando] =
    useState(false);

  const [escanerAbierto, setEscanerAbierto] =
    useState(false);

  const total = carrito.reduce(
    (suma, item) =>
      suma + Number(item.precio) * item.cantidad,
    0
  );

  const recibido = Number(montoRecibido) || 0;

  const vuelto =
    recibido >= total ? recibido - total : 0;

  const buscarPorCodigo = useCallback(
    async (codigoProducto: string) => {
      const codigoLimpio = codigoProducto.trim();

      if (!codigoLimpio) return;

      setError("");
      setMensaje("");
      setBuscando(true);

      try {
        const producto =
          await buscarProductoPorCodigo(codigoLimpio);

        setCarrito((actual) => {
          const existente = actual.find(
            (item) => item.id === producto.id
          );

          if (existente) {
            if (
              existente.cantidad >= producto.stock
            ) {
              setError(
                `Stock insuficiente. Disponible: ${producto.stock}`
              );

              return actual;
            }

            return actual.map((item) =>
              item.id === producto.id
                ? {
                    ...item,
                    cantidad: item.cantidad + 1,
                  }
                : item
            );
          }

          if (producto.stock <= 0) {
            setError(
              "El producto no tiene stock disponible"
            );

            return actual;
          }

          return [
            ...actual,
            {
              ...producto,
              cantidad: 1,
            },
          ];
        });

        setCodigo("");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setBuscando(false);
      }
    },
    []
  );

  const buscarProducto = () => {
    void buscarPorCodigo(codigo);
  };

  const codigoDetectado = useCallback(
    (codigoEscaneado: string) => {
      setEscanerAbierto(false);
      setCodigo(codigoEscaneado);

      void buscarPorCodigo(codigoEscaneado);
    },
    [buscarPorCodigo]
  );

  const cambiarCantidad = (
    productoId: string,
    nuevaCantidad: number
  ) => {
    setCarrito((actual) =>
      actual.map((item) => {
        if (item.id !== productoId) return item;

        return {
          ...item,
          cantidad: Math.max(
            1,
            Math.min(nuevaCantidad, item.stock)
          ),
        };
      })
    );
  };

  const eliminarProducto = (productoId: string) => {
    setCarrito((actual) =>
      actual.filter((item) => item.id !== productoId)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setMontoRecibido("");
    setError("");
    setMensaje("");
  };

  const finalizarVenta = async () => {
    setError("");
    setMensaje("");

    if (carrito.length === 0) {
      setError("Agrega al menos un producto");
      return;
    }

    if (recibido < total) {
      setError("El monto recibido es insuficiente");
      return;
    }

    setProcesando(true);

    try {
      const venta = await registrarVenta(
        recibido,
        carrito.map((item) => ({
          productoId: item.id,
          cantidad: item.cantidad,
        }))
      );

      setMensaje(
        `Venta registrada correctamente. Vuelto: ${Number(
          venta.vuelto
        ).toLocaleString("es-PY")} Gs.`
      );

      setCarrito([]);
      setMontoRecibido("");
      setCodigo("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setProcesando(false);
    }
  };

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_380px]">
        <div className="space-y-4">
          <BuscadorProducto
            codigo={codigo}
            buscando={buscando}
            onCodigoChange={setCodigo}
            onBuscar={buscarProducto}
            onEscanear={() =>
              setEscanerAbierto(true)
            }
          />

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {mensaje && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
              {mensaje}
            </div>
          )}

          <CarritoVenta
            carrito={carrito}
            onCambiarCantidad={cambiarCantidad}
            onEliminar={eliminarProducto}
            onVaciar={vaciarCarrito}
          />
        </div>

        <aside>
          <ResumenCobro
            total={total}
            montoRecibido={montoRecibido}
            vuelto={vuelto}
            procesando={procesando}
            puedeFinalizar={
              carrito.length > 0 &&
              recibido >= total
            }
            onMontoChange={setMontoRecibido}
            onFinalizar={finalizarVenta}
          />
        </aside>
      </div>

      <EscanerCodigoBarras
        abierto={escanerAbierto}
        onCerrar={() =>
          setEscanerAbierto(false)
        }
        onDetectado={codigoDetectado}
      />
    </>
  );
}

export default CajaPage;