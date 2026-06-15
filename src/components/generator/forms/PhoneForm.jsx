import { Input } from '@/components/shared/Input'

export function PhoneForm({ value, onChange }) {
  return (
    <Input
      id="phone-input"
      label="Phone Number"
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="+84901234567"
      hint="Include country code (e.g. +84 for Vietnam). When scanned, opens the phone dialer."
    />
  )
}
