import { Input } from '@/components/shared/Input'

export function EmailForm({ value, onChange }) {
  return (
    <Input
      id="email-input"
      label="Email Address"
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="contact@hsb.edu.vn"
      hint="When scanned, opens the email app with this recipient pre-filled"
    />
  )
}
