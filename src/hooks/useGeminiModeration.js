import { useState, useCallback } from 'react'
import { moderateContent } from '@/services/geminiService'
import { checkBadWords } from '@/utils/badWordFilter'

export function useGeminiModeration() {
  const [status, setStatus] = useState('idle')
  const [reason, setReason] = useState('')
  const [category, setCategory] = useState('')
  const hasGemini = Boolean(import.meta.env.VITE_GEMINI)

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

    // Layer 2: Gemini AI for smarter checks (phishing URLs, nuanced content)
    // If no key or API is down, we already passed layer 1 — allow the content
    if (!hasGemini) {
      setStatus('safe')
      return true
    }

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
      // Gemini unavailable — layer 1 already passed, allow
      setStatus('safe')
      return true
    }
  }, [hasGemini])

  const reset = useCallback(() => {
    setStatus('idle')
    setReason('')
    setCategory('')
  }, [])

  return { moderate, status, reason, category, hasGemini, reset }
}
