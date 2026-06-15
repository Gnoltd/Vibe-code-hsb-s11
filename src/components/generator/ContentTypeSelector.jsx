import { CONTENT_TYPES } from '@/constants/contentTypes'

export function ContentTypeSelector({ activeType, onSelect }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {CONTENT_TYPES.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onSelect(type.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all
            ${activeType === type.id
              ? 'bg-hsb-blue text-white border-hsb-blue shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-hsb-blue hover:text-hsb-blue'
            }`}
        >
          <span>{type.icon}</span>
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  )
}
