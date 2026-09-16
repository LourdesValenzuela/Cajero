import { useState } from "react";

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Boxes,
  Circle,
  History,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  Users,
  X,
  LayoutDashboard,
} from "lucide-react";

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  rol: "ADMIN" | "CAJERO";
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const usuarioGuardado =
    localStorage.getItem("usuario");

  const usuario: Usuario | null = usuarioGuardado
    ? JSON.parse(usuarioGuardado)
    : null;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const mobileLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50"
    }`;

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        {/* ESCRITORIO */}
        <div className="hidden min-h-16 items-center gap-5 px-5 lg:flex">
          <div className="flex min-w-max items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ShoppingCart size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold leading-none">
                Cajero
              </h1>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                Punto de venta
              </p>
            </div>
          </div>

          <nav className="flex flex-1 items-center gap-1">
            {usuario?.rol === "ADMIN" && (
              <NavLink
                to="/dashboard"
                className={linkClass}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </NavLink>
            )}
            <NavLink
              to="/caja"
              className={linkClass}
            >
              <ShoppingCart size={16} />
              Nueva Venta
            </NavLink>

            <NavLink
              to="/productos"
              className={linkClass}
            >
              <Package size={16} />
              Productos
            </NavLink>

            {usuario?.rol === "ADMIN" && (
              <NavLink
                to="/inventario"
                className={linkClass}
              >
                <Boxes size={16} />
                Inventario
              </NavLink>
            )}

            <NavLink
              to="/ventas"
              className={linkClass}
            >
              <History size={16} />
              Historial de Ventas
            </NavLink>

            {usuario?.rol === "ADMIN" && (
              <NavLink
                to="/usuarios"
                className={linkClass}
              >
                <Users size={16} />
                Usuarios
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 xl:flex">
              <Circle
                size={7}
                fill="currentColor"
              />
              Caja Online
            </div>

            <div className="hidden border-l border-slate-200 pl-4 xl:block">
              <p className="text-sm font-semibold">
                {usuario?.nombre}{" "}
                {usuario?.apellido}
              </p>

              <p className="text-xs text-slate-400">
                {usuario?.rol === "ADMIN"
                  ? "Administrador"
                  : "Cajero"}
              </p>
            </div>

            <button
              type="button"
              onClick={cerrarSesion}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={16} />

              <span className="hidden xl:inline">
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>

        {/* MÓVIL / TABLET */}
        <div className="flex min-h-16 items-center justify-between px-4 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ShoppingCart size={21} />
            </div>

            <div>
              <h1 className="text-base font-bold leading-none">
                Cajero
              </h1>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-blue-600">
                Punto de venta
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="max-w-40 truncate text-sm font-semibold text-slate-800">
                {usuario?.nombre}{" "}
                {usuario?.apellido}
              </p>

              <p className="text-xs text-slate-400">
                {usuario?.rol === "ADMIN"
                  ? "Administrador"
                  : "Cajero"}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setMenuAbierto(
                  (actual) => !actual
                )
              }
              aria-label={
                menuAbierto
                  ? "Cerrar menú"
                  : "Abrir menú"
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              {menuAbierto ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        {menuAbierto && (
          <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 lg:hidden">
            <div className="mb-3 sm:hidden">
              <p className="text-sm font-semibold text-slate-800">
                {usuario?.nombre}{" "}
                {usuario?.apellido}
              </p>

              <p className="text-xs text-slate-400">
                {usuario?.rol === "ADMIN"
                  ? "Administrador"
                  : "Cajero"}
              </p>
            </div>

            <nav className="space-y-1">
              {usuario?.rol === "ADMIN" && (
                <NavLink
                  to="/dashboard"
                  className={linkClass}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="/caja"
                className={mobileLinkClass}
                onClick={cerrarMenu}
              >
                <ShoppingCart size={18} />
                Nueva Venta
              </NavLink>

              <NavLink
                to="/productos"
                className={mobileLinkClass}
                onClick={cerrarMenu}
              >
                <Package size={18} />
                Productos
              </NavLink>

              {usuario?.rol === "ADMIN" && (
                <NavLink
                  to="/inventario"
                  className={mobileLinkClass}
                  onClick={cerrarMenu}
                >
                  <Boxes size={18} />
                  Inventario
                </NavLink>
              )}

              <NavLink
                to="/ventas"
                className={mobileLinkClass}
                onClick={cerrarMenu}
              >
                <History size={18} />
                Historial de Ventas
              </NavLink>

              {usuario?.rol === "ADMIN" && (
                <NavLink
                  to="/usuarios"
                  className={mobileLinkClass}
                  onClick={cerrarMenu}
                >
                  <Users size={18} />
                  Usuarios
                </NavLink>
              )}
            </nav>

            <div className="my-3 border-t border-slate-200" />

            <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
              <Circle
                size={7}
                fill="currentColor"
              />
              Caja Online
            </div>

            <button
              type="button"
              onClick={cerrarSesion}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      <main className="p-3 sm:p-4 lg:p-5">
        <Outlet key={location.pathname} />
      </main>
      <footer className="px-4 py-5 text-center text-xs text-slate-400">
        © 2026 Cajero · Desarrollado por Lourdes Valenzuela
      </footer>
    </div>
  );
}

export default AppLayout;