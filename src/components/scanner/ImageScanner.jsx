import { useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Spinner } from '@/components/shared/Spinner'

export function ImageScanner({ onResult }) {
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const decoded = await Html5Qrcode.scanFile(file, true)
      onResult(decoded)
    } catch {
      setError('No QR code found in this image. Try a clearer photo.')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <label
        className="block w-full border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer
          hover:border-hsb-blue hover:bg-blue-50 transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer.files?.[0]
          if (file) {
            const dt = new DataTransfer()
            dt.items.add(file)
            inputRef.current.files = dt.files
            handleFile({ target: inputRef.current })
          }
        }}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {loading ? (
          <div className="flex flex-col items-center gap-2 text-hsb-blue">
            <Spinner size="lg" />
            <span className="text-sm">Scanning image…</span>
          </div>
        ) : (
          <div className="text-gray-400">
            <p className="text-4xl mb-2">🖼</p>
            <p className="text-sm font-medium text-gray-600">Click or drag an image here</p>
            <p className="text-xs mt-1">PNG, JPG, WEBP supported</p>
          </div>
        )}
      </label>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </div>
  )
}
