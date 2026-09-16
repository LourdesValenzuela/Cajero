import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "danger" | "neutral" | "info";
}

function Badge({
  children,
  variant = "neutral",
}: BadgeProps) {
  const variants = {
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    neutral: "bg-slate-100 text-slate-500",
    info: "bg-blue-50 text-blue-600",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-2.5 py-1
        text-xs font-semibold
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;