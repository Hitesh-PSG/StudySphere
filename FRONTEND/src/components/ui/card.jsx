import React from 'react';

export const Card = React.forwardRef((props, ref) => <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${props.className}`} {...props} />);
export const CardHeader = React.forwardRef((props, ref) => <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${props.className}`} {...props} />);
export const CardTitle = React.forwardRef((props, ref) => <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${props.className}`} {...props} />);
export const CardDescription = React.forwardRef((props, ref) => <p ref={ref} className={`text-sm text-muted-foreground ${props.className}`} {...props} />);
export const CardContent = React.forwardRef((props, ref) => <div ref={ref} className={`p-6 pt-0 ${props.className}`} {...props} />);