import React from 'react'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'

export default function App() {
  return (
    <>
      <ParticleTextEffect
        words={['БУ', 'ИИспугался?', 'Залетай', 'Будь', 'тру-айтишником!']}
      />
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-center py-3">
        <div className="text-white/70 text-xs md:text-sm">
          Бу! ИИспугался? <span className="mx-2">•</span>
          <span className="text-white/40">2025</span>
        </div>
      </footer>
    </>
  )
}
