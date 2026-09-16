import type { Usuario } from "../../services/api";

interface Props {
  usuarios: Usuario[];
}

function UsuariosTable({ usuarios }: Props) {
  if (usuarios.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center">
        <p className="font-semibold text-slate-700">
          No se encontraron usuarios
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Prueba con otro nombre o correo electrónico.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Usuario</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Rol</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3">Creado</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="text-sm transition hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-800">
                    {usuario.nombre} {usuario.apellido}
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {usuario.email}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      usuario.rol === "ADMIN"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {usuario.rol === "ADMIN"
                      ? "Administrador"
                      : "Cajero"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      usuario.activo
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {usuario.activo
                      ? "Activo"
                      : "Inactivo"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {new Date(
                    usuario.creadoEn
                  ).toLocaleDateString("es-PY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsuariosTable;