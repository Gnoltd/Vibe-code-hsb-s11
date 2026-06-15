import { useState, useCallback } from 'react'
import { moderateContent } from '@/services/geminiService'

export function useGeminiModeration() {
  const [status, setStatus] = useState('idle') // idle | checking | safe | unsafe | error
  const [reason, setReason] = useState('')
  const [category, setCategory] = useState('')
  const hasGemini = Boolean(import.meta.env.VITE_GEMINI)

  const moderate = useCallback(async (content) => {
    if (!hasGemini || !content.trim()) {
      setStatus('idle')
      return true
    }
    setStatus('checking')
    setReason('')
    setCategory('')
    try {
      const result = await moderateContent(content)
      if (result.safe) {
        setStatus('safe')
        return true
      } else {
        setStatus('unsafe')
        setReason(result.reason || 'Content flagged as inappropriate.')
        setCategory(result.category || '')
        return false
      }
    } catch {
      setStatus('error')
      return true // fail open
    }
  }, [hasGemini])

  const reset = useCallback(() => {
    setStatus('idle')
    setReason('')
    setCategory('')
  }, [])

  return { moderate, status, reason, category, hasGemini, reset }
}
