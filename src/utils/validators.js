// Returns { valid: boolean, error: string }
export function validateByType(type, fields) {
  switch (type) {
    case 'url':    return validateUrl(fields.url || '')
    case 'text':   return validateText(fields.text || '')
    case 'email':  return validateEmail(fields.email || '')
    case 'phone':  return validatePhone(fields.phone || '')
    case 'wifi':   return validateWifi(fields.wifi || '')
    default:       return { valid: true, error: '' }
  }
}

function validateUrl(url) {
  if (!url.trim()) return { valid: false, error: 'URL is required.' }
  if (!/^https?:\/\//i.test(url)) return { valid: false, error: 'URL must start with https:// or http://' }
  try {
    new URL(url)
    return { valid: true, error: '' }
  } catch {
    return { valid: false, error: 'Enter a valid URL (e.g. https://hsb.edu.vn).' }
  }
}

function validateText(text) {
  if (!text.trim()) return { valid: false, error: 'Message text is required.' }
  if (text.length > 900) return { valid: false, error: `Text is too long (${text.length}/900 chars). Shorten it for reliable scanning.` }
  return { valid: true, error: '' }
}

function validateEmail(email) {
  if (!email.trim()) return { valid: false, error: 'Email address is required.' }
  // RFC 5322-ish check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { valid: false, error: 'Enter a valid email address (e.g. contact@hsb.edu.vn).' }
  }
  return { valid: true, error: '' }
}

function validatePhone(phone) {
  if (!phone.trim()) return { valid: false, error: 'Phone number is required.' }
  const digits = phone.replace(/[\s\-().+]/g, '')
  if (!/^\d{7,15}$/.test(digits)) {
    return { valid: false, error: 'Enter a valid phone number with 7–15 digits (include country code).' }
  }
  return { valid: true, error: '' }
}

function validateWifi(wifiString) {
  if (!wifiString || wifiString === 'WIFI:T:WPA;S:;P:;;') {
    return { valid: false, error: 'Network name (SSID) is required.' }
  }
  const ssidMatch = wifiString.match(/S:([^;]*)/)
  const ssid = ssidMatch?.[1] || ''
  if (!ssid.trim()) return { valid: false, error: 'Network name (SSID) is required.' }

  const encMatch = wifiString.match(/T:([^;]*)/)
  const enc = encMatch?.[1] || ''
  if (enc !== 'nopass') {
    const passMatch = wifiString.match(/P:([^;]*)/)
    const pass = passMatch?.[1] || ''
    if (!pass.trim()) return { valid: false, error: 'Password is required for this security type.' }
    if (enc === 'WPA' && pass.length < 8) {
      return { valid: false, error: 'WPA password must be at least 8 characters.' }
    }
  }
  return { valid: true, error: '' }
}

// Warn (non-blocking) — returns string or ''
export function getWarning(type, fields) {
  if (type === 'text') {
    const len = (fields.text || '').length
    if (len > 500) return `Long text (${len} chars) may create a dense QR. Keep under 500 for best scannability.`
  }
  if (type === 'url') {
    const url = fields.url || ''
    if (url.startsWith('http://')) return 'HTTP URLs are unencrypted. Use https:// when possible.'
  }
  return ''
}
