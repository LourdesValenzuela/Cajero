import { useEffect, useMemo, useState } from "react";

import ProductosHeader from "../components/productos/ProductosHeader";
import ProductosResumen from "../components/productos/ProductosResumen";
import ProductosTable from "../components/productos/ProductosTable";
import ProductosSkeleton from "../components/productos/ProductosSkeleton";
import NuevoProductoModal from "../components/productos/NuevoProductoModal";
import NuevaCategoriaModal from "../components/productos/NuevaCategoriaModal";
import { CircleCheck } from "lucide-react";

import { obtenerProductos } from "../services/api";
import type { Categoria, Producto } from "../services/api";

function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [modalProductoAbierto, setModalProductoAbierto] =
    useState(false);

  const [modalCategoriaAbierto, setModalCategoriaAbierto] =
    useState(false);

  const usuarioGuardado = localStorage.getItem("usuario");

  const usuario = usuarioGuardado
    ? JSON.parse(usuarioGuardado)
    : null;

  const esAdmin = usuario?.rol === "ADMIN";

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) return productos;

    return productos.filter(
      (producto) =>
        producto.nombre
          .toLowerCase()
          .includes(texto) ||
        producto.codigoBarras
          .toLowerCase()
          .includes(texto)
    );
  }, [productos, busqueda]);

  const productoCreado = (producto: Producto) => {
    setProductos((actuales) => [
      producto,
      ...actuales,
    ]);

    setMensaje(
      `${producto.nombre} fue registrado correctamente.`
    );

    setTimeout(() => {
      setMensaje("");
    }, 4000);
  };

  const categoriaCreada = (categoria: Categoria) => {
    setMensaje(
      `La categoría ${categoria.nombre} fue creada correctamente.`
    );

    setTimeout(() => {
      setMensaje("");
    }, 4000);
  };

  if (cargando) {
    return <ProductosSkeleton />;
  }

  return (
    <>
      <div className="space-y-5">
        <ProductosHeader
          busqueda={busqueda}
          cantidadResultados={productosFiltrados.length}
          puedeCrear={esAdmin}
          onBusquedaChange={setBusqueda}
          onNuevaCategoria={() =>
            setModalCategoriaAbierto(true)
          }
          onNuevoProducto={() =>
            setModalProductoAbierto(true)
          }
        />

        <ProductosResumen productos={productos} />

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

        <ProductosTable
          productos={productosFiltrados}
        />
      </div>

      {esAdmin && (
        <>
          <NuevaCategoriaModal
            abierto={modalCategoriaAbierto}
            onCerrar={() =>
              setModalCategoriaAbierto(false)
            }
            onCategoriaCreada={categoriaCreada}
          />

          <NuevoProductoModal
            abierto={modalProductoAbierto}
            onCerrar={() =>
              setModalProductoAbierto(false)
            }
            onProductoCreado={productoCreado}
          />
        </>
      )}
    </>
  );
}

export default ProductosPage;