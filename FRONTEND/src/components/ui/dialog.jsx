import React from 'react';

// This is a simplified dialog for presentation
export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => onOpenChange(false)}>
      {children}
    </div>
  );
};

export const DialogContent = React.forwardRef((props, ref) => (
  <div ref={ref} onClick={(e) => e.stopPropagation()} className={`relative z-50 grid w-full gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg ${props.className}`}>
    {props.children}
  </div>
));
export const DialogHeader = (props) => <div className={`flex flex-col space-y-2 text-center sm:text-left ${props.className}`} {...props} />;
export const DialogTitle = React.forwardRef((props, ref) => <h2 ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${props.className}`} {...props} />);