import { useRef } from 'react'
import { Button } from '@/components/shared/Button'

export function CSVUploader({ onFile, hasRows }) {
  const inputRef = useRef(null)

  function handleFile(file) {
    if (!file || !file.name.endsWith('.csv')) return
    onFile(file)
  }

  return (
    <div className="space-y-3">
      <label
        className="block w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer
          hover:border-hsb-blue hover:bg-blue-50 transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleFile(e.dataTransfer.files?.[0])
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <p className="text-3xl mb-2">📄</p>
        <p className="text-sm font-medium text-gray-700">
          {hasRows ? 'Upload a different CSV' : 'Click or drag a CSV file here'}
        </p>
        <p className="text-xs text-gray-400 mt-1">Required columns: <code>label</code>, <code>content</code></p>
      </label>

      <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 font-mono space-y-1">
        <p className="font-semibold text-gray-700 font-sans">Example CSV format:</p>
        <p>label,content</p>
        <p>Registration Form,https://forms.hsb.edu.vn/reg</p>
        <p>Guest WiFi,"WIFI:T:WPA;S:HSB-Guest;P:welcome123;;"</p>
        <p>IT Email,mailto:it@hsb.edu.vn</p>
      </div>
    </div>
  )
}
