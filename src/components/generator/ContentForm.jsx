import { UrlForm } from './forms/UrlForm'
import { TextForm } from './forms/TextForm'
import { EmailForm } from './forms/EmailForm'
import { PhoneForm } from './forms/PhoneForm'
import { WifiForm } from './forms/WifiForm'

export function ContentForm({ type, fields, onFieldChange }) {
  const value = fields[type] || ''
  const onChange = (val) => onFieldChange(type, val)

  switch (type) {
    case 'url':   return <UrlForm   value={value} onChange={onChange} />
    case 'text':  return <TextForm  value={value} onChange={onChange} />
    case 'email': return <EmailForm value={value} onChange={onChange} />
    case 'phone': return <PhoneForm value={value} onChange={onChange} />
    case 'wifi':  return <WifiForm  onChange={onChange} />
    default:      return null
  }
}
