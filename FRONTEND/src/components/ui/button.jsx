import React from 'react';

export const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  // A simple button with basic styling to get you started
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  // You can add more variants and sizes here if needed
  return (
    <button
      className={`${baseClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});