import '../../styles/ui/input.css'

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`input ${className}`}
      {...props}
    />
  )
}