export function Header() {
  return (
    <header className="bg-hsb-blue text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <rect x="2" y="2" width="8" height="8" rx="1" fill="#003087"/>
              <rect x="14" y="2" width="8" height="8" rx="1" fill="#003087"/>
              <rect x="2" y="14" width="8" height="8" rx="1" fill="#003087"/>
              <rect x="14" y="14" width="3" height="3" fill="#C8960C"/>
              <rect x="19" y="14" width="3" height="3" fill="#003087"/>
              <rect x="14" y="19" width="3" height="3" fill="#003087"/>
              <rect x="19" y="19" width="3" height="3" fill="#C8960C"/>
            </svg>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">HSB QR Generator</h1>
          <p className="text-blue-200 text-xs">Hoa Sen Bank — QR Tool for Staff</p>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1">
          <span className="bg-hsb-gold text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            ✦ Superpowered
          </span>
        </div>
      </div>
    </header>
  )
}
