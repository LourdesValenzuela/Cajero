import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { crearUsuario } from "../../services/api";

import type {
  NuevoUsuario,
  Usuario,
} from "../../services/api";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  onUsuarioCreado: (usuario: Usuario) => void;
}

function NuevoUsuarioModal({
  abierto,
  onCerrar,
  onUsuarioCreado,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] =
    useState<NuevoUsuario["rol"]>("CAJERO");

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  if (!abierto) {
    return null;
  }

  const limpiar = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setPassword("");
    setRol("CAJERO");
    setError("");
  };

  const cerrar = () => {
    if (guardando) return;

    limpiar();
    onCerrar();
  };

  const guardar = async () => {
    setError("");

    if (!nombre.trim()) {
      setError("Ingresa el nombre.");
      return;
    }

    if (!apellido.trim()) {
      setError("Ingresa el apellido.");
      return;
    }

    if (!email.trim()) {
      setError("Ingresa el correo electrónico.");
      return;
    }

    if (!email.includes("@")) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      setError(
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    setGuardando(true);

    try {
      const usuario = await crearUsuario({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim().toLowerCase(),
        password,
        rol,
      });

      onUsuarioCreado(usuario);
      limpiar();
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
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Administración
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Nuevo usuario
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Crea una cuenta para acceder a Cajero.
            </p>
          </div>

          <button
            type="button"
            onClick={cerrar}
            disabled={guardando}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              placeholder="Ej. María"
            />

            <Input
              label="Apellido"
              value={apellido}
              onChange={(e) =>
                setApellido(e.target.value)
              }
              placeholder="Ej. González"
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="maria@gmail.com"
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Mínimo 6 caracteres"
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Rol
            </label>

            <select
              value={rol}
              onChange={(e) =>
                setRol(
                  e.target.value as
                    | "ADMIN"
                    | "CAJERO"
                )
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            >
              <option value="CAJERO">Cajero</option>
              <option value="ADMIN">
                Administrador
              </option>
            </select>

            <p className="mt-2 text-xs text-slate-400">
              Los administradores pueden gestionar productos,
              inventario y usuarios.
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
            disabled={guardando}
          >
            {guardando
              ? "Creando..."
              : "Crear usuario"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NuevoUsuarioModal;