// FRONTEND/src/components/ui/badge.jsx

import * as React from "react";

// A simple, reusable badge component using Tailwind CSS
function Badge({ className, variant, ...props }) {
  // Define base classes for all badges
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  // Define classes for different variants
  const variantClasses = {
    default: "border-transparent bg-slate-900 text-slate-50 shadow hover:bg-slate-900/80",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "border-transparent bg-red-500 text-slate-50 shadow hover:bg-red-500/80",
    outline: "text-slate-50",
  };

  // Determine which variant class to use, defaulting to 'outline' if not specified
  const variantClass = variantClasses[variant] || variantClasses.outline;

  return (
    <div className={`${baseClasses} ${variantClass} ${className}`} {...props} />
  );
}

export { Badge };