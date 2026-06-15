import { Spinner } from '@/components/shared/Spinner'

export function QRPreview({ canvasRef, isGenerating, hasQR, size }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden"
        style={{ width: Math.max(size, 200), height: Math.max(size, 200) }}
      >
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-xl">
            <Spinner size="lg" className="text-hsb-blue" />
          </div>
        )}

        {!hasQR && !isGenerating && (
          <div className="text-center text-gray-400 p-4 select-none">
            <div className="text-5xl mb-2 opacity-30">⬛</div>
            <p className="text-sm">Your QR code will appear here</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={hasQR ? 'block rounded-lg' : 'hidden'}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  )
}
