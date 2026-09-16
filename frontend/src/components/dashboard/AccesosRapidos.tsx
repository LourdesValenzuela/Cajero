import { Link } from "react-router-dom";

import {
  Boxes,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import Card from "../ui/Card";

const accesos = [
  {
    titulo: "Nueva venta",
    descripcion: "Ir al punto de venta",
    ruta: "/caja",
    icono: ShoppingCart,
  },
  {
    titulo: "Productos",
    descripcion: "Gestionar productos",
    ruta: "/productos",
    icono: Package,
  },
  {
    titulo: "Inventario",
    descripcion: "Administrar stock",
    ruta: "/inventario",
    icono: Boxes,
  },
  {
    titulo: "Usuarios",
    descripcion: "Gestionar usuarios",
    ruta: "/usuarios",
    icono: Users,
  },
];

function AccesosRapidos() {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900">
          Accesos rápidos
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Funciones principales del sistema
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {accesos.map((acceso) => {
          const Icono = acceso.icono;

          return (
            <Link
              key={acceso.ruta}
              to={acceso.ruta}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Icono size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                  {acceso.titulo}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {acceso.descripcion}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

export default AccesosRapidos;