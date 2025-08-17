import React, { useState, useEffect } from 'react'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'
import { GradientButton } from '@/components/ui/gradient-button'
import { ProfilePage } from '@/components/ui/profile-page'
import { LearnPage } from '@/components/ui/learn-page'
import { CareerPage } from '@/components/ui/career-page'
import { PricesPage } from '@/components/ui/prices-page'
import { CompaniesPage } from '@/components/ui/companies-page'
import { AIHelper } from '@/components/ui/ai-helper'
import { MorphingSquare } from '@/components/ui/morphing-square'
import { Navigation } from '@/components/ui/navigation'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'learn' | 'career' | 'prices' | 'companies'>('home')
  const [currentSubPage, setCurrentSubPage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Сбрасываем состояние загрузки при изменении страницы
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentPage, isLoading])

  const handleNavigate = (page: string) => {
    setIsLoading(true)
    
    if (page === 'logout') {
      setCurrentPage('home')
      setCurrentSubPage('')
    } else if (page === 'profile') {
      setCurrentPage('profile')
      setCurrentSubPage('')
    } else if (page === 'learn') {
      setCurrentPage('learn')
      setCurrentSubPage('')
    } else if (page === 'career') {
      setCurrentPage('career')
      setCurrentSubPage('')
    } else if (page === 'prices') {
      setCurrentPage('prices')
      setCurrentSubPage('')
    } else if (page === 'companies') {
      setCurrentPage('companies')
      setCurrentSubPage('')
    } else if (page === 'courses' || page === 'trainers' || page === 'library') {
      setCurrentPage('learn')
      setCurrentSubPage(page)
    } else if (page === 'resume' || page === 'prospects') {
      setCurrentPage('career')
      setCurrentSubPage(page)
    }
  }

  const handleStartClick = () => {
    setIsLoading(true)
    setCurrentPage('profile')
  }

  // Если не на главной странице, показываем соответствующую страницу
  if (currentPage === 'profile') {
    return (
      <>
        <Navigation key="profile" onNavigate={handleNavigate} currentPage="profile" />
        <ProfilePage onNavigate={handleNavigate} isLoading={isLoading} />
      </>
    )
  }
  
  if (currentPage === 'learn') {
    return (
      <>
        <Navigation key="learn" onNavigate={handleNavigate} currentPage="learn" />
        <LearnPage onNavigate={handleNavigate} isLoading={isLoading} currentSubPage={currentSubPage} />
      </>
    )
  }
  
  if (currentPage === 'career') {
    return (
      <>
        <Navigation key="career" onNavigate={handleNavigate} currentPage="career" />
        <CareerPage onNavigate={handleNavigate} isLoading={isLoading} currentSubPage={currentSubPage} />
      </>
    )
  }
  
  if (currentPage === 'prices') {
    return (
      <>
        <Navigation key="prices" onNavigate={handleNavigate} currentPage="prices" />
        <PricesPage onNavigate={handleNavigate} isLoading={isLoading} />
      </>
    )
  }
  
  if (currentPage === 'companies') {
    return (
      <>
        <Navigation key="companies" onNavigate={handleNavigate} currentPage="companies" />
        <CompaniesPage onNavigate={handleNavigate} isLoading={isLoading} />
      </>
    )
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
