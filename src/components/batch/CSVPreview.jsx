export function CSVPreview({ rows }) {
  if (!rows.length) return null
  const preview = rows.slice(0, 10)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">{rows.length} QR codes ready to generate</p>
        {rows.length > 10 && <p className="text-xs text-gray-400">Showing first 10 rows</p>}
      </div>
      <div className="overflow-auto rounded-lg border border-gray-200 scrollbar-thin">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">#</th>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">Label</th>
              <th className="px-3 py-2 text-left text-gray-500 font-medium">Content</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {preview.map((row) => (
              <tr key={row.index} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{row.index}</td>
                <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">{row.label}</td>
                <td className="px-3 py-2 text-gray-500 max-w-xs truncate">{row.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
