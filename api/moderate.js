const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const SAFETY_PROMPT = (content) => `
You are a strict content safety classifier for an official university QR code tool used by students, lecturers, and staff at Hoa Sen Bank (HSB). This tool is operated in a professional academic environment.

Your task: analyze the content below that will be encoded into a QR code.
Respond ONLY with valid JSON and nothing else: {"safe": boolean, "reason": "string", "category": "string"}

BLOCK the content (safe: false) if it contains ANY of the following:

1. OFFENSIVE LANGUAGE
   - Insults, slurs, or degrading words (e.g. "stupid", "idiot", "moron", "dumb", "loser") used to demean
   - Profanity or vulgar words in any language including Vietnamese (e.g. đồ ngu, thằng điên, con chó, đm, vcl)
   - Bullying, harassment, threatening, or intimidating language
   - Personal attacks on individuals or groups

2. ADULT / 18+ CONTENT
   - Sexual content, explicit material, pornography references
   - Adult services, escort services, suggestive URLs or keywords

3. HATE SPEECH
   - Discrimination based on race, religion, gender, sexual orientation, nationality, or disability
   - Extremist, terrorist, or radicalizing content

4. DANGEROUS / ILLEGAL CONTENT
   - Drug references (buying, selling, using)
   - Violence, self-harm, or suicide encouragement
   - Scam, fraud, or illegal activity instructions
   - Instructions for weapons or harmful substances

5. MALICIOUS URLS
   - Phishing domains mimicking real sites (e.g. g00gle.com, faceb00k.net)
   - URLs with login credentials embedded, suspicious IP:port patterns
   - Domains known for malware or harmful content

ALLOW (safe: true) all normal content:
- University links, course registrations, schedules, campus maps
- Professional contact info (email, phone, WiFi)
- Standard informational text in any language
- Vietnamese language content that is professional and appropriate

Rules for your JSON response:
- If SAFE: {"safe": true, "reason": "", "category": "safe"}
- If UNSAFE: {"safe": false, "reason": "one short English sentence explaining why", "category": "<one of: offensive_language | adult_content | hate_speech | dangerous_content | malicious_url>"}

Content to analyze:
${content}
`.trim()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI
  if (!apiKey) {
    return res.status(200).json({ safe: true, reason: '', category: 'safe' })
  }

  const { content } = req.body
  if (!content) {
    return res.status(200).json({ safe: true, reason: '', category: 'safe' })
  }

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: SAFETY_PROMPT(content) }] }],
        generationConfig: { temperature: 0, maxOutputTokens: 200 },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    })

    if (!geminiRes.ok) {
      console.warn('Gemini error', geminiRes.status)
      return res.status(200).json({ safe: true, reason: '', category: 'safe' })
    }

    const data = await geminiRes.json()
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return res.status(200).json({ safe: true, reason: '', category: 'safe' })
    }

    const result = JSON.parse(jsonMatch[0])
    return res.status(200).json({
      safe: result.safe === true,
      reason: result.reason || '',
      category: result.category || 'safe',
    })
  } catch {
    return res.status(200).json({ safe: true, reason: '', category: 'safe' })
  }
}
