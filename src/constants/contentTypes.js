export const CONTENT_TYPES = [
  {
    id: 'url',
    label: 'URL',
    icon: '🔗',
    placeholder: 'https://hsb.edu.vn',
    hint: 'Full website address including https://',
  },
  {
    id: 'text',
    label: 'Text',
    icon: '📝',
    placeholder: 'Your message here…',
    hint: 'Plain text, Vietnamese characters supported',
  },
  {
    id: 'email',
    label: 'Email',
    icon: '📧',
    placeholder: 'contact@hsb.edu.vn',
    hint: 'Opens email app with recipient pre-filled',
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: '📞',
    placeholder: '+84901234567',
    hint: 'Include country code for international use',
  },
  {
    id: 'wifi',
    label: 'WiFi',
    icon: '📶',
    placeholder: '',
    hint: 'Scanned device will prompt to join the network',
  },
]

export const WIFI_ENCRYPTION = [
  { value: 'WPA', label: 'WPA/WPA2 (recommended)' },
  { value: 'WEP', label: 'WEP (legacy)' },
  { value: 'nopass', label: 'No password (open)' },
]

export function formatWifi({ ssid, password, encryption }) {
  const pass = encryption === 'nopass' ? '' : password
  return `WIFI:T:${encryption};S:${ssid};P:${pass};;`
}

export function buildContent(type, fields) {
  switch (type) {
    case 'url':
      return fields.url || ''
    case 'text':
      return fields.text || ''
    case 'email':
      return fields.email ? `mailto:${fields.email}` : ''
    case 'phone':
      return fields.phone ? `tel:${fields.phone}` : ''
    case 'wifi':
      // WifiForm stores the pre-formatted WIFI string in fields.wifi
      return fields.wifi || ''
    default:
      return ''
  }
}
