import { COLOR_PRESETS } from '@/constants/colorPresets'

export function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset.hex}
            type="button"
            title={preset.name}
            onClick={() => onChange(preset.hex)}
            className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110
              ${value === preset.hex ? 'border-gray-800 scale-110' : 'border-gray-200'}`}
            style={{ backgroundColor: preset.hex }}
          />
        ))}
        <label
          title="Custom color"
          className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-500 overflow-hidden relative"
          style={{ backgroundColor: COLOR_PRESETS.some(p => p.hex === value) ? 'transparent' : value }}
        >
          <span className="text-gray-400 text-xs absolute pointer-events-none">+</span>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
        </label>
      </div>
    </div>
  )
}
