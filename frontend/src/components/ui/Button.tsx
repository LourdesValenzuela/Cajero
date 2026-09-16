import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "success" | "danger" | "secondary";
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-slate-300",
    danger:
      "border border-red-200 bg-white text-red-500 hover:bg-red-50",
    secondary:
      "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
  };

  return (
    <button
      className={`
        rounded-lg px-4 py-2.5
        text-sm font-semibold
        transition
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;