// Reusable Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} className={`input ${error ? 'input-error' : ''} ${className}`} {...props} />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  )
}
