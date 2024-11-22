import '../../styles/ui/button.css'

export function Button({ className, variant = 'primary', ...props }) {
  const buttonClass = `button button--${variant} ${className || ''}`
  
  return (
    <button
      className={buttonClass}
      {...props}
    />
  )
}