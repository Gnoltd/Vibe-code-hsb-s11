export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <span>© {new Date().getFullYear()} Hoa Sen Bank — Internal Tool</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
          AI Moderation · Batch Export · QR Scanner
        </span>
      </div>
    </footer>
  )
}
