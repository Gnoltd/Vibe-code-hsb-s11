import { QR_SIZES } from '@/constants/qrSizes'
import { ColorPicker } from './ColorPicker'

export function CustomizationPanel({ size, onSizeChange, fgColor, onFgChange, bgColor, onBgChange, useLogo, onLogoToggle }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Size</p>
        <div className="flex flex-wrap gap-1.5">
          {QR_SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onSizeChange(s.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                ${size === s.value
                  ? 'bg-hsb-blue text-white border-hsb-blue'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-hsb-blue'
                }`}
            >
              {s.label}
              <span className="block text-[10px] opacity-60">{s.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <ColorPicker label="QR Color" value={fgColor} onChange={onFgChange} />
      <ColorPicker label="Background Color" value={bgColor} onChange={onBgChange} />

      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <div
          onClick={onLogoToggle}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors
            ${useLogo ? 'bg-hsb-blue' : 'bg-gray-300'}`}
        >
          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform
            ${useLogo ? 'translate-x-4' : 'translate-x-1'}`}
          />
        </div>
        <span className="text-sm text-gray-700">Embed HSB logo</span>
      </label>
    </div>
  )
}
