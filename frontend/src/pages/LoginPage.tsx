import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  Boxes,
  Eye,
  EyeOff,
  Package,
  ShoppingCart,
} from "lucide-react";

import { login } from "../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {
      const data = await login(
        email.trim().toLowerCase(),
        password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      if (data.usuario.rol === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/caja");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Panel visual */}
        <section className="hidden bg-blue-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <ShoppingCart size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Cajero
              </h1>

              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Punto de venta
              </p>
            </div>
          </div>

          <div className="max-w-lg">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200">
              Gestión simple
            </p>

            <h2 className="text-4xl font-bold leading-tight">
              Todo lo necesario para gestionar tu caja.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-blue-100">
              Registra ventas, consulta productos y
              controla el inventario desde un solo lugar.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/10 p-4">
                <ShoppingCart
                  size={21}
                  strokeWidth={1.8}
                />

                <p className="mt-3 text-sm font-semibold">
                  Ventas
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <Package
                  size={21}
                  strokeWidth={1.8}
                />

                <p className="mt-3 text-sm font-semibold">
                  Productos
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <Boxes
                  size={21}
                  strokeWidth={1.8}
                />

                <p className="mt-3 text-sm font-semibold">
                  Inventario
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-blue-200">
            Sistema de gestión de caja
          </p>
        </section>

        {/* Login */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Marca para pantallas pequeñas */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <ShoppingCart size={22} />
              </div>

              <div>
                <h1 className="font-bold text-slate-900">
                  Cajero
                </h1>

                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Punto de venta
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-blue-600">
                Bienvenido
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Iniciar sesión
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ingresa tus datos para acceder al sistema.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="nombre@gmail.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={
                      mostrarPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setMostrarPassword(
                        (actual) => !actual
                      )
                    }
                    aria-label={
                      mostrarPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                    title={
                      mostrarPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 transition hover:text-blue-600"
                  >
                    {mostrarPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={cargando}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cargando
                  ? "Iniciando sesión..."
                  : "Iniciar sesión"}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-6 text-center">
              <p className="text-xs leading-5 text-slate-400">
                ¿No tienes acceso? Solicita una cuenta al
                administrador del sistema.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;