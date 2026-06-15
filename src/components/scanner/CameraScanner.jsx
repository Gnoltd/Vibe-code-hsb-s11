import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from '@/components/shared/Button'

const SCANNER_ID = 'hsb-camera-scanner'

export function CameraScanner({ onResult }) {
  const scannerRef = useRef(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  async function startCamera() {
    setError(null)
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(SCANNER_ID)
      }
      await scannerRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decoded) => {
          stopCamera()
          onResult(decoded)
        },
        () => {}
      )
      setScanning(true)
    } catch (err) {
      setError('Camera access denied or not available. Check browser permissions.')
    }
  }

  async function stopCamera() {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop()
      }
    } catch {}
    setScanning(false)
  }

  return (
    <div className="space-y-4">
      <div
        id={SCANNER_ID}
        className="w-full rounded-xl overflow-hidden bg-gray-900"
        style={{ minHeight: 260 }}
      />
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      <div className="flex justify-center gap-3">
        {!scanning ? (
          <Button variant="primary" onClick={startCamera}>
            📷 Start Camera
          </Button>
        ) : (
          <Button variant="secondary" onClick={stopCamera}>
            ⏹ Stop Camera
          </Button>
        )}
      </div>
      {scanning && (
        <p className="text-xs text-center text-gray-500">
          Point your camera at a QR code — it will be detected automatically
        </p>
      )}
    </div>
  )
}
