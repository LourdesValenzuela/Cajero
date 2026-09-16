import { useEffect, useMemo, useState } from "react";

import UsuariosHeader from "../components/usuarios/UsuariosHeader";
import UsuariosResumen from "../components/usuarios/UsuariosResumen";
import UsuariosTable from "../components/usuarios/UsuariosTable";
import UsuariosSkeleton from "../components/usuarios/UsuariosSkeleton";
import NuevoUsuarioModal from "../components/usuarios/NuevoUsuarioModal";
import { CircleCheck } from "lucide-react";

import { obtenerUsuarios } from "../services/api";
import type { Usuario } from "../services/api";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, []);

  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return usuarios;
    }

    return usuarios.filter((usuario) => {
      const nombreCompleto =
        `${usuario.nombre} ${usuario.apellido}`.toLowerCase();

      return (
        nombreCompleto.includes(texto) ||
        usuario.email.toLowerCase().includes(texto)
      );
    });
  }, [usuarios, busqueda]);

  const usuarioCreado = (usuario: Usuario) => {
    setUsuarios((actuales) => [
      usuario,
      ...actuales,
    ]);

    setMensaje(
      `${usuario.nombre} ${usuario.apellido} fue creado correctamente.`
    );

    setTimeout(() => {
      setMensaje("");
    }, 4000);
  };

  if (cargando) {
    return <UsuariosSkeleton />;
  }

  return (
    <>
      <div className="space-y-5">
        <UsuariosHeader
          busqueda={busqueda}
          cantidadResultados={usuariosFiltrados.length}
          onBusquedaChange={setBusqueda}
          onNuevoUsuario={() =>
            setModalAbierto(true)
          }
        />

        <UsuariosResumen usuarios={usuarios} />

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

        <UsuariosTable
          usuarios={usuariosFiltrados}
        />
      </div>

      <NuevoUsuarioModal
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        onUsuarioCreado={usuarioCreado}
      />
    </>
  );
}

export default UsuariosPage;