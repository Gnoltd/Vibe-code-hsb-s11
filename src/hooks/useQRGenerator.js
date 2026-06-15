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
        await embedLogo(canvas, logoSrc, bgColor)
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

function embedLogo(canvas, logoSrc, bgColor = '#ffffff') {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const ctx = canvas.getContext('2d')

      // Max bounding box = 26% of canvas, maintain natural aspect ratio
      const maxBox = canvas.width * 0.26
      const ratio = Math.min(maxBox / img.naturalWidth, maxBox / img.naturalHeight)
      const logoW = Math.round(img.naturalWidth * ratio)
      const logoH = Math.round(img.naturalHeight * ratio)
      const x = Math.round((canvas.width - logoW) / 2)
      const y = Math.round((canvas.height - logoH) / 2)
      const pad = Math.round(canvas.width * 0.025) // ~7px at 300px

      // Padding background matches bgColor so it blends with QR background
      ctx.fillStyle = bgColor
      ctx.beginPath()
      ctx.roundRect(x - pad, y - pad, logoW + pad * 2, logoH + pad * 2, pad)
      ctx.fill()

      ctx.drawImage(img, x, y, logoW, logoH)
      resolve()
    }
    img.onerror = () => resolve()
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
  if (logoSrc) await embedLogo(canvas, logoSrc, bgColor)
  return canvas
}
