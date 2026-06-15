export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default:  'bg-gray-100 text-gray-700',
    safe:     'bg-green-100 text-green-700',
    unsafe:   'bg-red-100 text-red-700',
    warning:  'bg-yellow-100 text-yellow-700',
    info:     'bg-blue-100 text-blue-700',
    checking: 'bg-blue-50 text-blue-600',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
