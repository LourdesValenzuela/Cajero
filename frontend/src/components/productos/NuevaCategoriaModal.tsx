import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { crearCategoria } from "../../services/api";
import type { Categoria } from "../../services/api";
import { X } from "lucide-react";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  onCategoriaCreada: (categoria: Categoria) => void;
}

function NuevaCategoriaModal({
  abierto,
  onCerrar,
  onCategoriaCreada,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");


  if (!abierto) {
    return null;
  }

  const cerrar = () => {
    if (guardando) return;

    setNombre("");
    setDescripcion("");
    setError("");
    onCerrar();
  };

  const guardar = async () => {
    setError("");

    const nombreLimpio = nombre.trim();
    const descripcionLimpia = descripcion.trim();

    if (!nombreLimpio) {
      setError("Ingresa el nombre de la categoría.");
      return;
    }

    if (nombreLimpio.length > 100) {
      setError(
        "El nombre no puede superar los 100 caracteres."
      );
      return;
    }

    if (descripcionLimpia.length > 255) {
      setError(
        "La descripción no puede superar los 255 caracteres."
      );
      return;
    }

    setGuardando(true);

    try {
      const categoria = await crearCategoria({
        nombre: nombreLimpio,
        descripcion: descripcionLimpia || undefined,
      });

      onCategoriaCreada(categoria);

      setNombre("");
      setDescripcion("");
      setError("");

      onCerrar();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          cerrar();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Catálogo
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Nueva categoría
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Crea una categoría para organizar los productos.
            </p>
          </div>

          <button
            type="button"
            onClick={cerrar}
            disabled={guardando}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <Input
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Alimentos"
            maxLength={100}
            autoFocus
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Descripción
              <span className="ml-1 font-normal text-slate-400">
                (opcional)
              </span>
            </label>

            <textarea
              value={descripcion}
              onChange={(e) =>
                setDescripcion(e.target.value)
              }
              placeholder="Ej. Productos alimenticios y comestibles"
              maxLength={255}
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {descripcion.length}/255
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button
            variant="secondary"
            onClick={cerrar}
            disabled={guardando}
          >
            Cancelar
          </Button>

          <Button
            onClick={guardar}
            disabled={guardando || !nombre.trim()}
          >
            {guardando
              ? "Guardando..."
              : "Crear categoría"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NuevaCategoriaModal;