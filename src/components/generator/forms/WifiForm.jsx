import { useState } from 'react'
import { Input } from '@/components/shared/Input'
import { Select } from '@/components/shared/Select'
import { WIFI_ENCRYPTION } from '@/constants/contentTypes'

export function WifiForm({ onChange }) {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState('WPA')
  const [showPassword, setShowPassword] = useState(false)

  function emit(updates) {
    const vals = { ssid, password, encryption, ...updates }
    const pass = vals.encryption === 'nopass' ? '' : vals.password
    onChange(`WIFI:T:${vals.encryption};S:${vals.ssid};P:${pass};;`)
  }

  return (
    <div className="space-y-3">
      <Input
        id="wifi-ssid"
        label="Network Name (SSID)"
        value={ssid}
        onChange={(e) => { setSsid(e.target.value); emit({ ssid: e.target.value }) }}
        placeholder="HSB-Campus"
      />
      <Select
        id="wifi-enc"
        label="Security Type"
        options={WIFI_ENCRYPTION}
        value={encryption}
        onChange={(e) => { setEncryption(e.target.value); emit({ encryption: e.target.value }) }}
      />
      {encryption !== 'nopass' && (
        <div className="space-y-1">
          <label htmlFor="wifi-pass" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="wifi-pass"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); emit({ password: e.target.value }) }}
              placeholder="Network password"
              className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg bg-white
                focus:outline-none focus:ring-2 focus:ring-hsb-blue focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-500">When scanned, compatible devices will prompt to join this network automatically.</p>
    </div>
  )
}
