import { saveAs } from 'file-saver'
import { Button } from '@/components/shared/Button'
import { useClipboard } from '@/hooks/useClipboard'

export function ExportActions({ canvasRef, hasQR, filename = 'hsb-qr' }) {
  const { copyCanvas, copied } = useClipboard()

  function downloadPNG() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob((blob) => saveAs(blob, `${filename}.png`), 'image/png')
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="primary"
        onClick={downloadPNG}
        disabled={!hasQR}
      >
        ⬇ Download PNG
      </Button>
      <Button
        variant="secondary"
        onClick={() => copyCanvas(canvasRef.current)}
        disabled={!hasQR}
      >
        {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
      </Button>
    </div>
  )
}
