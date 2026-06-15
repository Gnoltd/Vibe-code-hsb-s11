import { useState, useCallback } from 'react'

export function useClipboard() {
  const [copied, setCopied] = useState(false)

  const copyCanvas = useCallback(async (canvas) => {
    if (!canvas) return false
    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      return true
    } catch {
      return false
    }
  }, [])

  return { copyCanvas, copied }
}
