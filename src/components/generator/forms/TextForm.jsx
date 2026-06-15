export function TextForm({ value, onChange }) {
  return (
    <div className="space-y-1">
      <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
        Message
      </label>
      <textarea
        id="text-input"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your message here… (Vietnamese characters supported)"
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900
          placeholder-gray-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-hsb-blue focus:border-transparent"
      />
      <p className="text-xs text-gray-500">{value.length} characters</p>
    </div>
  )
}
