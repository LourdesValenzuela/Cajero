import { LayoutDashboard } from "lucide-react";

function DashboardHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <LayoutDashboard size={20} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Dashboard
          </h2>

          <p className="mt-0.5 text-sm text-slate-400">
            Resumen general del punto de venta
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;