import Button from "../ui/Button";
import Input from "../ui/Input";

interface Props {
  cantidad: string;
  motivo: string;
  onCantidadChange: (valor: string) => void;
  onMotivoChange: (valor: string) => void;
  onRegistrar: () => void;
}

function EntradaStockCard({
  cantidad,
  motivo,
  onCantidadChange,
  onMotivoChange,
  onRegistrar,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
          Entrada
        </p>

        <h3 className="mt-1 text-lg font-bold text-slate-900">
          Entrada de mercadería
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Suma unidades al stock actual del producto.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Cantidad recibida"
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) =>
            onCantidadChange(e.target.value)
          }
          placeholder="Ej. 20"
        />

        <Input
          label="Motivo"
          value={motivo}
          onChange={(e) =>
            onMotivoChange(e.target.value)
          }
          placeholder="Ej. Reposición de mercadería"
        />

        <Button onClick={onRegistrar}>
          Registrar entrada
        </Button>
      </div>
    </div>
  );
}

export default EntradaStockCard;