import type { Producto } from "../../services/api";

interface Props {
  productos: Producto[];
  productoId: string;
  onChange: (productoId: string) => void;
}

function SelectorProducto({
  productos,
  productoId,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Producto
      </label>

      <select
        value={productoId}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      >
        <option value="">
          Selecciona un producto
        </option>

        {productos.map((producto) => (
          <option
            key={producto.id}
            value={producto.id}
          >
            {producto.nombre} — Stock: {producto.stock}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorProducto;