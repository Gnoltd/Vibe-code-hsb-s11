const TABS = [
  { id: 'generator', label: 'QR Generator', icon: '⚡' },
  { id: 'scanner',   label: 'QR Scanner',   icon: '📷' },
  { id: 'batch',     label: 'Batch Export',  icon: '📦' },
]

export function TabNav({ activeTab, onTabChange }) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-hsb-blue text-hsb-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
