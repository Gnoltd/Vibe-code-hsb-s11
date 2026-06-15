import { Spinner } from '@/components/shared/Spinner'
import { Badge } from '@/components/shared/Badge'

const CATEGORY_LABELS = {
  offensive_language: '🤬 Offensive Language',
  adult_content:      '🔞 Adult Content',
  hate_speech:        '⛔ Hate Speech',
  dangerous_content:  '☠ Dangerous Content',
  malicious_url:      '🎣 Malicious URL',
}

export function ModerationBadge({ status, category }) {
  if (status === 'idle') return null

  return (
    <div className="flex items-center gap-2">
      {status === 'checking' && (
        <Badge variant="checking">
          <Spinner size="sm" />
          AI scanning content…
        </Badge>
      )}
      {status === 'safe' && (
        <Badge variant="safe">✓ Content safe</Badge>
      )}
      {status === 'unsafe' && (
        <Badge variant="unsafe">
          {CATEGORY_LABELS[category] || '⚠ Content flagged'}
        </Badge>
      )}
      {status === 'error' && (
        <Badge variant="warning">⚠ Moderation offline</Badge>
      )}
    </div>
  )
}
