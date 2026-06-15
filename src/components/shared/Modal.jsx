import { useEffect } from 'react'
import { Button } from './Button'

export function Modal({ open, title, children, onClose, danger = false }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose?.()
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
        {title && (
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold text-lg ${danger ? 'text-red-700' : 'text-gray-900'}`}>
              {title}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          </div>
        )}
        <div className="text-sm text-gray-600">{children}</div>
        <div className="flex justify-end">
          <Button variant={danger ? 'danger' : 'primary'} onClick={onClose}>
            OK, got it
          </Button>
        </div>
      </div>
    </div>
  )
}
