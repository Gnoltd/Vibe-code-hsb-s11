export function Input({ label, id, hint, error, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 text-sm border rounded-lg bg-white text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-hsb-blue focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-400' : 'border-gray-300'}
          ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
