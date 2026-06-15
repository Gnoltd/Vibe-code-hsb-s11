import { useState, useCallback } from 'react'
import { moderateContent } from '@/services/geminiService'
import { checkBadWords } from '@/utils/badWordFilter'

export function useGeminiModeration() {
  const [status, setStatus] = useState('idle')
  const [reason, setReason] = useState('')
  const [category, setCategory] = useState('')

  const moderate = useCallback(async (content) => {
    if (!content.trim()) {
      setStatus('idle')
      return true
    }

    setStatus('checking')
    setReason('')
    setCategory('')

    // Layer 1: instant client-side keyword filter (always runs, no API needed)
    const kwResult = checkBadWords(content)
    if (kwResult.blocked) {
      setStatus('unsafe')
      setReason(kwResult.reason)
      setCategory(kwResult.category)
      return false
    }

    // Layer 2: server-side Gemini AI (key is hidden, never exposed to browser)
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
      setStatus('safe')
      return true
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setReason('')
    setCategory('')
  }, [])

  return { moderate, status, reason, category, hasGemini: true, reset }
}
