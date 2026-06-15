import { useState } from 'react'
import { ContentTypeSelector } from './ContentTypeSelector'
import { ContentForm } from './ContentForm'
import { CustomizationPanel } from './CustomizationPanel'
import { QRPreview } from './QRPreview'
import { ExportActions } from './ExportActions'
import { ModerationBadge } from './ModerationBadge'
import { Button } from '@/components/shared/Button'
import { Modal } from '@/components/shared/Modal'
import { useQRGenerator } from '@/hooks/useQRGenerator'
import { useGeminiModeration } from '@/hooks/useGeminiModeration'
import { buildContent } from '@/constants/contentTypes'
import { DEFAULT_SIZE } from '@/constants/qrSizes'
import { validateByType, getWarning } from '@/utils/validators'

export function GeneratorPage() {
  const [activeType, setActiveType] = useState('url')
  const [fields, setFields] = useState({})
  const [size, setSize] = useState(DEFAULT_SIZE)
  const [fgColor, setFgColor] = useState('#003087')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [useLogo, setUseLogo] = useState(true)
  const [unsafeModal, setUnsafeModal] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [touched, setTouched] = useState(false)

  const { canvasRef, generate, reset, isGenerating, hasQR, error: qrError } = useQRGenerator()
  const { moderate, status: modStatus, reason: modReason, category: modCategory, hasGemini } = useGeminiModeration()

  function handleFieldChange(type, value) {
    setFields((prev) => ({ ...prev, [type]: value }))
    setValidationError('')
    reset()
  }

  function handleTypeChange(type) {
    setActiveType(type)
    setValidationError('')
    setTouched(false)
    reset()
  }

  async function handleGenerate() {
    setTouched(true)

    // Client-side validation
    const { valid, error: vErr } = validateByType(activeType, fields)
    if (!valid) {
      setValidationError(vErr)
      return
    }
    setValidationError('')

    const content = buildContent(activeType, fields)

    // AI moderation
    const safe = await moderate(content)
    if (!safe) {
      setUnsafeModal(true)
      return
    }

    const logoSrc = useLogo
      ? (bgColor.toLowerCase() === '#000000' || fgColor.toLowerCase() === '#ffffff'
          ? '/logo-hsb-white.svg'
          : '/logo-hsb.jpg')
      : null

    await generate({ content, size, fgColor, bgColor, logoSrc })
  }

  // Live validation feedback after first attempt
  const liveValidation = touched ? validateByType(activeType, fields) : { valid: true, error: '' }
  const warning = getWarning(activeType, fields)
  const isBusy = isGenerating || modStatus === 'checking'

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Input panel */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">Content</h2>
            <ContentTypeSelector activeType={activeType} onSelect={handleTypeChange} />
            <ContentForm type={activeType} fields={fields} onFieldChange={handleFieldChange} />

            {/* Live validation error */}
            {touched && !liveValidation.valid && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <span>⚠</span> {liveValidation.error}
              </p>
            )}

            {/* Non-blocking warning */}
            {warning && liveValidation.valid && (
              <p className="text-xs text-yellow-600 bg-yellow-50 rounded-lg px-3 py-2">
                ⚠ {warning}
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">Customize</h2>
            <CustomizationPanel
              size={size} onSizeChange={setSize}
              fgColor={fgColor} onFgChange={setFgColor}
              bgColor={bgColor} onBgChange={setBgColor}
              useLogo={useLogo} onLogoToggle={() => setUseLogo(!useLogo)}
            />
          </div>
        </div>

        {/* Right: Preview + actions */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center gap-4">

            <div className="flex items-center justify-between w-full">
              <h2 className="font-semibold text-gray-800">Preview</h2>
              {hasGemini && <ModerationBadge status={modStatus} category={modCategory} />}
            </div>

            <QRPreview canvasRef={canvasRef} isGenerating={isGenerating} hasQR={hasQR} size={size} />

            {qrError && <p className="text-sm text-red-600 text-center">{qrError}</p>}
            {validationError && (
              <p className="text-sm text-red-600 text-center flex items-center gap-1">
                <span>⚠</span> {validationError}
              </p>
            )}

            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              disabled={isBusy}
              className="w-full max-w-xs"
            >
              {isGenerating
                ? 'Generating…'
                : modStatus === 'checking'
                ? 'Checking content…'
                : '⚡ Generate QR Code'}
            </Button>

            <ExportActions canvasRef={canvasRef} hasQR={hasQR} filename={`hsb-qr-${activeType}`} />
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 space-y-1">
            <p className="font-semibold">Tips for best results</p>
            <p>• Always test your QR code by scanning it before printing</p>
            <p>• Use high contrast: dark QR on light background scans most reliably</p>
            <p>• For posters, use 400×400 or 500×500. For digital use, 200×200 is fine</p>
            {hasGemini && <p>• AI moderation is active — inappropriate content will be blocked</p>}
          </div>
        </div>
      </div>

      <Modal
        open={unsafeModal}
        title="⚠ Content Flagged"
        onClose={() => setUnsafeModal(false)}
        danger
      >
        <p>This content was flagged by AI moderation and cannot be encoded into a QR code.</p>
        {modReason && <p className="mt-2 text-gray-500 italic">Reason: {modReason}</p>}
        <p className="mt-2">Please review your content and try again.</p>
      </Modal>
    </div>
  )
}
