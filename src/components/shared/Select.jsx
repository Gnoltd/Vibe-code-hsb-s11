export function Select({ label, id, hint, options, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900
          focus:outline-none focus:ring-2 focus:ring-hsb-blue focus:border-transparent
          ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
}
