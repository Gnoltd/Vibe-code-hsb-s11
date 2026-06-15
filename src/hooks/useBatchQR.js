import { useState, useCallback } from 'react'
import Papa from 'papaparse'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { generateOffscreen } from './useQRGenerator'
import { buildContent } from '@/constants/contentTypes'

export function useBatchQR({ fgColor, bgColor, logoSrc, size }) {
  const [rows, setRows] = useState([])
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle') // idle | generating | done | error
  const [stats, setStats] = useState({ total: 0, success: 0, failed: 0 })

  const parseCSV = useCallback((file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const normalized = result.data.map((row, i) => ({
            index: i + 1,
            label: row.label || row.name || `QR_${i + 1}`,
            type: detectType(row),
            content: row.content || row.url || row.text || '',
            raw: row,
          }))
          resolve(normalized)
        },
        error: reject,
      })
    })
  }, [])

  const loadFile = useCallback(async (file) => {
    try {
      const parsed = await parseCSV(file)
      setRows(parsed)
      setStatus('idle')
      setProgress(0)
    } catch {
      setStatus('error')
    }
  }, [parseCSV])

  const generate = useCallback(async () => {
    if (!rows.length) return
    setStatus('generating')
    setProgress(0)

    const zip = new JSZip()
    let success = 0
    let failed = 0

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      try {
        const content = row.content || buildContent(row.type, row.raw)
        if (!content) throw new Error('empty content')

        const canvas = await generateOffscreen({ content, size, fgColor, bgColor, logoSrc })
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
        const filename = sanitizeFilename(row.label) + '.png'
        zip.file(filename, blob)
        success++
      } catch {
        failed++
      }
      setProgress(Math.round(((i + 1) / rows.length) * 100))
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, `hsb-qr-batch-${Date.now()}.zip`)
    setStats({ total: rows.length, success, failed })
    setStatus('done')
  }, [rows, size, fgColor, bgColor, logoSrc])

  const reset = useCallback(() => {
    setRows([])
    setProgress(0)
    setStatus('idle')
    setStats({ total: 0, success: 0, failed: 0 })
  }, [])

  return { rows, loadFile, generate, progress, status, stats, reset }
}

function detectType(row) {
  if (row.type) return row.type.toLowerCase()
  const c = (row.content || row.url || row.text || '').toLowerCase()
  if (c.startsWith('wifi:')) return 'wifi'
  if (c.startsWith('mailto:')) return 'email'
  if (c.startsWith('tel:')) return 'phone'
  return 'url'
}

function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9_\-\s]/gi, '').replace(/\s+/g, '_').slice(0, 60) || 'qr'
}
