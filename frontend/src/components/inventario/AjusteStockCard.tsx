import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props {
  nuevoStock: string;
  motivo: string;
  onStockChange: (valor: string) => void;
  onMotivoChange: (valor: string) => void;
  onAjustar: () => void;
}

function AjusteStockCard({
  nuevoStock,
  motivo,
  onStockChange,
  onMotivoChange,
  onAjustar,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-600">
          Corrección
        </p>

        <h3 className="mt-1 text-lg font-bold text-slate-900">
          Ajustar stock
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Corrige diferencias entre el stock registrado y el stock físico.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Nuevo stock real"
          type="number"
          min="0"
          value={nuevoStock}
          onChange={(e) =>
            onStockChange(e.target.value)
          }
          placeholder="Ej. 15"
        />

        <Input
          label="Motivo del ajuste"
          value={motivo}
          onChange={(e) =>
            onMotivoChange(e.target.value)
          }
          placeholder="Ej. Diferencia en conteo físico"
        />

        <Button onClick={onAjustar}>
          Ajustar stock
        </Button>
      </div>
    </div>
  );
}

export default AjusteStockCard;