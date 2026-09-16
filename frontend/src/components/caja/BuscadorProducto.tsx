import { Camera } from "lucide-react";

import Button from "../ui/Button";
import Card from "../ui/Card";

interface Props {
  codigo: string;
  buscando: boolean;
  onCodigoChange: (codigo: string) => void;
  onBuscar: () => void;
  onEscanear: () => void;
}

function BuscadorProducto({
  codigo,
  buscando,
  onCodigoChange,
  onBuscar,
  onEscanear,
}: Props) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            Escanear o buscar producto
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Escanea o ingresa el código de barras del producto
          </p>
        </div>

        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
          F1
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={codigo}
          onChange={(e) => onCodigoChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onBuscar();
            }
          }}
          placeholder="Escanea o escribe el código de barras"
          autoFocus
          className="
            h-12 flex-1 rounded-lg
            border-2 border-blue-500
            px-4 text-sm
            outline-none transition
            placeholder:text-slate-400
            focus:ring-4 focus:ring-blue-50
          "
        />

        <Button
          variant="secondary"
          onClick={onEscanear}
          disabled={buscando}
          className="min-w-28"
        >
          <span className="flex items-center justify-center gap-2">
            <Camera size={16} />
            Cámara
          </span>
        </Button>

        <Button
          onClick={onBuscar}
          disabled={buscando || !codigo.trim()}
          className="min-w-28"
        >
          {buscando ? "Buscando..." : "Agregar"}
        </Button>
      </div>
    </Card>
  );
}

export default BuscadorProducto;