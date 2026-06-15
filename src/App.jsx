import { useState } from 'react'
import { Header } from './components/layout/Header'
import { TabNav } from './components/layout/TabNav'
import { Footer } from './components/layout/Footer'
import { GeneratorPage } from './components/generator/GeneratorPage'
import { ScannerPage } from './components/scanner/ScannerPage'
import { BatchPage } from './components/batch/BatchPage'

export default function App() {
  const [activeTab, setActiveTab] = useState('generator')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === 'generator' && <GeneratorPage />}
        {activeTab === 'scanner'   && <ScannerPage />}
        {activeTab === 'batch'     && <BatchPage />}
      </main>
      <Footer />
    </div>
  )
}
