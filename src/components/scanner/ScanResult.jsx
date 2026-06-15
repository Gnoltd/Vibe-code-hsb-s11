import { useState } from 'react'
import { Button } from '@/components/shared/Button'

export function ScanResult({ result, onClose }) {
  const [copied, setCopied] = useState(false)

  function copyText() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function isURL(str) {
    try { return ['http:', 'https:'].includes(new URL(str).protocol) } catch { return false }
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold text-sm">✓ QR Decoded</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
      </div>
      <div className="bg-white rounded-lg p-3 border border-green-100 break-all text-sm text-gray-800 font-mono">
        {result}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={copyText}>
          {copied ? '✓ Copied!' : '📋 Copy'}
        </Button>
        {isURL(result) && (
          <Button variant="primary" size="sm" onClick={() => window.open(result, '_blank', 'noopener')}>
            🔗 Open URL
          </Button>
        )}
      </div>
    </div>
  )
}
