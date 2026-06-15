export async function moderateContent(content) {
  try {
    const res = await fetch('/api/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })

    if (!res.ok) {
      console.warn('Moderation API error', res.status)
      return { safe: true, reason: '', category: 'safe' }
    }

    return await res.json()
  } catch (err) {
    console.warn('Moderation failed, allowing content:', err)
    return { safe: true, reason: '', category: 'safe' }
  }
}
