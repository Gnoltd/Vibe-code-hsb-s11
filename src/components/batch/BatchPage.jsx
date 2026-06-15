import { useState } from 'react'
import { CSVUploader } from './CSVUploader'
import { CSVPreview } from './CSVPreview'
import { BatchProgress } from './BatchProgress'
import { BatchDownload } from './BatchDownload'
import { Button } from '@/components/shared/Button'
import { useBatchQR } from '@/hooks/useBatchQR'

export function BatchPage() {
  const [fgColor] = useState('#003087')
  const [bgColor] = useState('#ffffff')
  const logoSrc = '/logo-hsb.svg'
  const size = 300

  const { rows, loadFile, generate, progress, status, stats, reset } = useBatchQR({
    fgColor, bgColor, logoSrc, size,
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">Batch QR Generation</h2>
            <p className="text-xs text-gray-500 mt-0.5">Upload a CSV → generate all QRs → download as ZIP</p>
          </div>
          {rows.length > 0 && status !== 'generating' && (
            <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
          )}
        </div>

        <CSVUploader onFile={loadFile} hasRows={rows.length > 0} />

        {rows.length > 0 && (
          <>
            <CSVPreview rows={rows} />
            <BatchProgress progress={progress} total={rows.length} status={status} />
            <BatchDownload status={status} stats={stats} />

            {status !== 'generating' && status !== 'done' && (
              <Button
                variant="primary"
                size="lg"
                onClick={generate}
                className="w-full"
              >
                📦 Generate {rows.length} QR Code{rows.length !== 1 ? 's' : ''} & Download ZIP
              </Button>
            )}
          </>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 space-y-1">
        <p className="font-semibold">Batch tips</p>
        <p>• All QRs are generated at 300×300px with HSB logo embedded</p>
        <p>• Files in the ZIP are named after the <code>label</code> column</p>
        <p>• WiFi content: use the full WIFI string format in the content column</p>
        <p>• For large batches (100+ rows), the process may take a few seconds</p>
      </div>
    </div>
  )
}
