import { useState } from 'react'
import { CameraScanner } from './CameraScanner'
import { ImageScanner } from './ImageScanner'
import { ScanResult } from './ScanResult'

export function ScannerPage() {
  const [mode, setMode] = useState('camera')
  const [result, setResult] = useState(null)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">QR Scanner</h2>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {['camera', 'image'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setResult(null) }}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all
                  ${mode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {m === 'camera' ? '📷 Camera' : '🖼 Image'}
              </button>
            ))}
          </div>
        </div>

        {mode === 'camera'
          ? <CameraScanner onResult={setResult} />
          : <ImageScanner onResult={setResult} />
        }
      </div>

      {result && (
        <ScanResult result={result} onClose={() => setResult(null)} />
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 space-y-1">
        <p className="font-semibold">Scanner tips</p>
        <p>• Camera mode: hold device steady, ensure QR is well-lit</p>
        <p>• Image mode: upload a clear, unblurred photo or screenshot</p>
        <p>• Camera requires HTTPS (available on Vercel)</p>
      </div>
    </div>
  )
}
