// Layer 1: client-side keyword filter — works with zero API calls
// Two matching strategies:
//   - English: whole-word regex (\b) to avoid "ass" matching "class"
//   - Vietnamese: phrase-level match to avoid "ngu" matching "Nguyen"

// English single words — matched with word boundary (\b...\b)
const EN_WORDS = [
  'stupid', 'idiot', 'moron', 'dumb', 'retard', 'loser', 'fool', 'jerk',
  'asshole', 'bastard', 'bitch', 'cunt', 'fuck', 'fucker', 'fucking',
  'shit', 'bullshit', 'crap', 'dick', 'cock', 'pussy', 'whore', 'slut',
  'nigger', 'faggot', 'dyke', 'kys',
  'porn', 'xxx', 'nsfw', 'hentai', 'nude', 'naked',
  'drug', 'drugs', 'cocaine', 'heroin', 'meth',
  'bomb', 'terrorist',
]

// English / universal phrases — substring match (already multi-word, low false-positive risk)
const PHRASES = [
  'kill yourself', 'go die', 'piece of shit', 'shoot everyone',
  'mass shooting', 'i will kill', 'i want to kill',
  'adult content', 'onlyfans', 'escort service', 'prostitut',
  'buy drugs', 'sell drugs',
]

// Vietnamese — phrase-level only to avoid matching names like "Nguyen" for "ngu"
const VI_PHRASES = [
  'đồ ngu', 'thằng ngu', 'con ngu', 'mày ngu',
  'đồ điên', 'thằng điên', 'con điên', 'mày điên',
  'đồ khốn', 'thằng khốn',
  'đồ chó', 'thằng chó', 'con chó',
  'óc chó', 'óc lợn', 'súc vật',
  'đụ mẹ', 'đụ má', 'đụ ba',
  'vcl', 'vkl', 'đcm', 'đmm', 'clm', 'dmm',
  'mẹ mày', 'tao giết', 'mày chết', 'chết đi', 'tao sẽ giết',
  'cave gọi', 'gái điếm', 'nhà thổ',
]

// Vietnamese words — only match when isolated (surrounded by space/punctuation/start/end)
// This blocks "ngu" alone but allows "Nguyen", blocks "điên" alone but allows it in place names
const VI_ISOLATED = [
  // Insults
  'ngu', 'đần', 'ngốc', 'khùng',
  // Sexual / vulgar
  'đụ', 'cặc', 'lồn', 'buồi', 'đĩ', 'điếm', 'cave',
]

function getCategory(word) {
  if (/porn|xxx|nsfw|hentai|nude|naked|adult|onlyfans|escort|prostitut|cave|điếm|đĩ/i.test(word))
    return 'adult_content'
  if (/bomb|terrorist|kill|shoot|drug|cocaine|heroin|meth|giết/i.test(word))
    return 'dangerous_content'
  return 'offensive_language'
}

export function checkBadWords(content) {
  const text = content.toLowerCase()

  // 1. English whole-word check
  for (const word of EN_WORDS) {
    const re = new RegExp(`\\b${word}\\b`, 'i')
    if (re.test(text)) {
      return { blocked: true, word, reason: `Content contains inappropriate language: "${word}"`, category: getCategory(word) }
    }
  }

  // 2. Universal phrase check
  for (const phrase of PHRASES) {
    if (text.includes(phrase)) {
      return { blocked: true, word: phrase, reason: `Content contains inappropriate language: "${phrase}"`, category: getCategory(phrase) }
    }
  }

  // 3. Vietnamese phrase check (original casing, lowercase)
  const textLower = content.toLowerCase()
  for (const phrase of VI_PHRASES) {
    if (textLower.includes(phrase.toLowerCase())) {
      return { blocked: true, word: phrase, reason: `Content contains inappropriate language: "${phrase}"`, category: getCategory(phrase) }
    }
  }

  // 4. Vietnamese isolated words — only match when surrounded by space/punctuation/start/end
  for (const word of VI_ISOLATED) {
    const re = new RegExp(`(?:^|[\\s,!?.;:])${word}(?:[\\s,!?.;:]|$)`, 'i')
    if (re.test(textLower)) {
      return { blocked: true, word, reason: `Content contains inappropriate language: "${word}"`, category: getCategory(word) }
    }
  }

  return { blocked: false }
}
