import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <input
        className={`
          h-11 w-full
          rounded-lg
          border border-slate-200
          bg-white
          px-3
          text-sm
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-50
          ${className}
        `}
        {...props}
      />
    </div>
  );
}

export default Input;