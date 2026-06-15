import { Input } from '@/components/shared/Input'

export function UrlForm({ value, onChange }) {
  return (
    <Input
      id="url-input"
      label="Website URL"
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="https://hsb.edu.vn"
      hint="Must include https:// or http://"
    />
  )
}
