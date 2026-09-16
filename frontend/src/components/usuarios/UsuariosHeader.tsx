import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props {
  busqueda: string;
  cantidadResultados: number;
  onBusquedaChange: (valor: string) => void;
  onNuevoUsuario: () => void;
}

function UsuariosHeader({
  busqueda,
  cantidadResultados,
  onBusquedaChange,
  onNuevoUsuario,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Usuarios
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Administra las personas que pueden acceder al sistema.
          </p>
        </div>

        <Button onClick={onNuevoUsuario}>
          + Nuevo usuario
        </Button>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="w-full sm:max-w-sm">
          <Input
            value={busqueda}
            onChange={(e) =>
              onBusquedaChange(e.target.value)
            }
            placeholder="Buscar por nombre o email..."
          />
        </div>

        <p className="text-xs font-medium text-slate-400">
          {cantidadResultados} usuarios encontrados
        </p>
      </div>
    </div>
  );
}

export default UsuariosHeader;