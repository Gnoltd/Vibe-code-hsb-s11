import { Spinner } from '@/components/shared/Spinner'

export function BatchProgress({ progress, total, status }) {
  if (status !== 'generating') return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-hsb-blue font-medium">
          <Spinner size="sm" />
          Generating QR codes…
        </div>
        <span className="text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-hsb-blue h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 text-center">
        Processing {Math.round((progress / 100) * total)} of {total} — this may take a moment for large batches
      </p>
    </div>
  )
}
