import { Badge } from '@/components/shared/Badge'

export function BatchDownload({ status, stats }) {
  if (status !== 'done') return null

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-green-700 font-semibold text-sm">✓ Batch complete — ZIP downloaded!</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="safe">{stats.success} generated</Badge>
        {stats.failed > 0 && <Badge variant="unsafe">{stats.failed} failed</Badge>}
        <Badge variant="info">{stats.total} total</Badge>
      </div>
      {stats.failed > 0 && (
        <p className="text-xs text-gray-500">
          Rows that failed may have had empty or invalid content. Check your CSV and re-run.
        </p>
      )}
    </div>
  )
}
