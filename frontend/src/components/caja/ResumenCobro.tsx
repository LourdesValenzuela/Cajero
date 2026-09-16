import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import { Check } from "lucide-react";

interface Props {
  total: number;
  montoRecibido: string;
  vuelto: number;
  procesando: boolean;
  puedeFinalizar: boolean;
  onMontoChange: (monto: string) => void;
  onFinalizar: () => void;
}

const formatearGs = (valor: number) =>
  valor.toLocaleString("es-PY");

function ResumenCobro({
  total,
  montoRecibido,
  vuelto,
  procesando,
  puedeFinalizar,
  onMontoChange,
  onFinalizar,
}: Props) {
  return (
    <Card className="p-5">
      <h2 className="mb-5 font-bold text-slate-800">
        Resumen de Cobro
      </h2>

      <div className="mb-5 rounded-xl border border-blue-300 bg-blue-50 p-5 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
          Total a cobrar
        </p>

        <p className="mt-1 text-3xl font-extrabold text-blue-600">
          {formatearGs(total)} Gs.
        </p>
      </div>

      <Input
        label="Monto recibido"
        type="number"
        min="0"
        value={montoRecibido}
        onChange={(e) => onMontoChange(e.target.value)}
        placeholder="0"
        className="text-lg font-bold"
      />

      <div className="mt-2 grid grid-cols-4 gap-2">
        <button
          onClick={() => onMontoChange(String(total))}
          className="rounded-lg bg-slate-100 py-2 text-xs font-semibold hover:bg-slate-200"
        >
          Exacto
        </button>

        {[50000, 100000, 200000].map((monto) => (
          <button
            key={monto}
            onClick={() => onMontoChange(String(monto))}
            className="rounded-lg bg-slate-100 py-2 text-xs font-semibold hover:bg-slate-200"
          >
            {formatearGs(monto)}
          </button>
        ))}
      </div>

      <div className="my-5 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <span className="text-sm font-semibold text-slate-700">
          Vuelto
        </span>

        <strong className="text-xl text-slate-900">
          {formatearGs(vuelto)} Gs.
        </strong>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-sm font-semibold text-slate-700">
          Método de pago
        </p>

        <button className="rounded-lg border-2 border-blue-500 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
          Efectivo
        </button>
      </div>

      <Button
        variant="success"
        onClick={onFinalizar}
        disabled={!puedeFinalizar || procesando}
        className="h-14 w-full text-base"
        >
        {procesando ? (
            "PROCESANDO..."
        ) : (
            <span className="flex items-center justify-center gap-2">
            <Check size={18} strokeWidth={2.5} />
            FINALIZAR VENTA
            </span>
        )}
</Button>
    </Card>
  );
}

export default ResumenCobro;