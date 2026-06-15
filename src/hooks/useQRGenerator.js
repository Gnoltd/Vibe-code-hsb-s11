import { useRef, useState, useCallback } from 'react'
import QRCode from 'qrcode'

export function useQRGenerator() {
  const canvasRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasQR, setHasQR] = useState(false)
  const [error, setError] = useState(null)

  const generate = useCallback(async ({ content, size, fgColor, bgColor, logoSrc }) => {
    if (!content.trim()) {
      setError('Please enter content before generating.')
      return false
    }
    setError(null)
    setIsGenerating(true)
    try {
      const canvas = canvasRef.current
      await QRCode.toCanvas(canvas, content, {
        width: size,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: fgColor, light: bgColor },
      })

      if (logoSrc) {
        await embedLogo(canvas, logoSrc)
      }

      setHasQR(true)
      return true
    } catch (err) {
      setError('Failed to generate QR code. Content may be too long.')
      return false
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const reset = useCallback(() => {
    setHasQR(false)
    setError(null)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  return { canvasRef, generate, reset, isGenerating, hasQR, error }
}

function embedLogo(canvas, logoSrc) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const ctx = canvas.getContext('2d')
      const logoSize = canvas.width * 0.22
      const x = (canvas.width - logoSize) / 2
      const y = (canvas.height - logoSize) / 2
      const pad = 6

      // White padding square behind logo
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2)
      ctx.drawImage(img, x, y, logoSize, logoSize)
      resolve()
    }
    img.onerror = () => resolve() // fail silently if logo can't load
    img.src = logoSrc
  })
}

export async function generateOffscreen({ content, size, fgColor, bgColor, logoSrc }) {
  const canvas = document.createElement('canvas')
  await QRCode.toCanvas(canvas, content, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: { dark: fgColor, light: bgColor },
  })
  if (logoSrc) await embedLogo(canvas, logoSrc)
  return canvas
}
