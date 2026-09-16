import type { ReactNode } from "react";

import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  variant?: "default" | "warning" | "danger" | "success";
}

function StatCard({
  title,
  value,
  description,
  icon,
  variant = "default",
}: StatCardProps) {
  const iconStyles = {
    default: "bg-blue-50 text-blue-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    success: "bg-emerald-50 text-emerald-600",
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div
            className={`
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              ${iconStyles[variant]}
            `}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatCard;