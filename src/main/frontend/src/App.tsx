import React from 'react'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'
import { GradientButton } from '@/components/ui/gradient-button'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 pb-20">
        <div className="relative">
          <ParticleTextEffect
            words={['БУ', 'ИИспугался?', 'Залетай', 'Будь', 'тру-айтишником!']}
          />
        </div>
        <div className="mt-8">
          <GradientButton className="text-lg px-8 py-3">
            Начать
          </GradientButton>
        </div>
      </div>
      <footer className="py-3 bg-black z-10">
        <div className="text-center">
          <div className="text-white/70 text-xs md:text-sm">
            Бу! ИИспугался? <span className="mx-2">•</span>
            <span className="text-white/40">2025</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
