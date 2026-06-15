const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const SAFETY_PROMPT = (content) => `
You are a strict content safety classifier for an official university QR code tool used by students, lecturers, and staff at Hoa Sen Bank (HSB). This tool is operated in a professional academic environment.

Your task: analyze the content below that will be encoded into a QR code.
Respond ONLY with valid JSON and nothing else: {"safe": boolean, "reason": "string", "category": "string"}

BLOCK the content (safe: false) if it contains ANY of the following:

1. OFFENSIVE LANGUAGE
   - Insults, slurs, or degrading words targeting any person or group (e.g. "stupid", "idiot", "moron", "dumb", combined with intent to demean)
   - Profanity or vulgar words in any language including Vietnamese (e.g. đồ ngu, thằng điên, con chó)
   - Bullying language or personal attacks
   - Harassment, threatening, or intimidating messages

2. ADULT / 18+ CONTENT
   - Sexual content, explicit material, pornography
   - References to adult services or escort services
   - Sexually suggestive URLs or keywords

3. HATE SPEECH
   - Discrimination based on race, religion, gender, sexual orientation, nationality, or disability
   - Extremist or terrorist content

4. DANGEROUS / ILLEGAL CONTENT
   - Drug references (buying, selling, consuming)
   - Violence, self-harm, or suicide encouragement
   - Illegal activities, scam or fraud instructions
   - Instructions for weapons or harmful substances

5. MALICIOUS URLS
   - Phishing domains mimicking real sites (e.g. g00gle.com, faceb00k.net)
   - URLs with suspicious patterns: login credentials in URL, IP-based URLs with ports, shortened URLs pointing to known bad patterns
   - Domains known for malware distribution

ALLOW (safe: true) everything else including:
- Normal university content: course links, registration forms, schedules, maps
- Professional contact info (email, phone)
- WiFi credentials for campus networks
- Standard informational text in any language

If safe: reason must be ""  and category must be "safe"
If unsafe: reason must be a short English sentence explaining why. category must be one of: "offensive_language" | "adult_content" | "hate_speech" | "dangerous_content" | "malicious_url"

Content to analyze: "${content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"
`.trim()

export async function moderateContent(content) {
  const apiKey = import.meta.env.VITE_GEMINI
  if (!apiKey) return { safe: true, reason: '', category: 'safe' }

  try {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: SAFETY_PROMPT(content) }] }],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 150,
          responseMimeType: 'application/json',
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    })

    if (!res.ok) {
      console.warn('Gemini moderation API error:', res.status)
      return { safe: true, reason: '', category: 'safe' }
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    const cleaned = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(cleaned)
    return {
      safe: Boolean(result.safe),
      reason: result.reason || '',
      category: result.category || 'safe',
    }
  } catch (err) {
    // Fail open — never block generation due to moderation service issues
    console.warn('Gemini moderation failed, allowing content:', err)
    return { safe: true, reason: '', category: 'safe' }
  }
}
