import React, { useState } from 'react'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'
import { GradientButton } from '@/components/ui/gradient-button'
import { ProfilePage } from '@/components/ui/profile-page'
import { LearnPage } from '@/components/ui/learn-page'
import { PricesPage } from '@/components/ui/prices-page'
import { AIHelper } from '@/components/ui/ai-helper'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'learn' | 'prices'>('home')

  const handleNavigate = (page: string) => {
    if (page === 'logout') {
      setCurrentPage('home')
    } else if (page === 'profile') {
      setCurrentPage('profile')
    } else if (page === 'learn') {
      setCurrentPage('learn')
    } else if (page === 'prices') {
      setCurrentPage('prices')
    }
  }

  const handleStartClick = () => {
    setCurrentPage('profile')
  }

  // Если не на главной странице, показываем соответствующую страницу
  if (currentPage === 'profile') {
    return <ProfilePage onNavigate={handleNavigate} />
  }
  
  if (currentPage === 'learn') {
    return <LearnPage onNavigate={handleNavigate} />
  }
  
  if (currentPage === 'prices') {
    return <PricesPage onNavigate={handleNavigate} />
  }

  return (
    <>
      <ParticleTextEffect
        words={['БУ', 'ИИспугался?', 'Залетай', 'Будь', 'тру-айтишником!']}
      />
      
      {/* Кнопка "Начать" */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20">
        <GradientButton 
          variant="variant"
          onClick={handleStartClick}
        >
          Начать
        </GradientButton>
      </div>
      
      {/* AI Помощник */}
      <AIHelper />
      
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-center py-3">
        <div className="text-white/70 text-xs md:text-sm">
          Бу! ИИспугался? <span className="mx-2">•</span>
          <span className="text-white/40">2025</span>
        </div>
      </footer>
    </>
  )
}
