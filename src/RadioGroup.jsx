// Minimal RadioGroup component stub
export function RadioGroup({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
export function RadioGroupItem({ children, ...props }) {
  return <input type="radio" {...props} />;
}
