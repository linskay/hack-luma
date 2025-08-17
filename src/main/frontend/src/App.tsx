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
import SQLTrainerPage from '@/components/ui/sql-trainer-page'
import { InterviewTrainingPage } from '@/components/ui/interview-training-page'
import { DockerTrainerPage } from '@/components/ui/docker-trainer-page'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'learn' | 'career' | 'prices' | 'companies' | 'sql' | 'courses' | 'trainers' | 'library' | 'resume' | 'prospects' | 'interview' | 'docker'>('home')
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
    } else if (page === 'profile') {
      setCurrentPage('profile')
    } else if (page === 'learn') {
      setCurrentPage('learn')
    } else if (page === 'career') {
      setCurrentPage('career')
    } else if (page === 'prices') {
      setCurrentPage('prices')
    } else if (page === 'companies') {
      setCurrentPage('companies')
    } else if (page === 'sql') {
      setCurrentPage('sql')
    } else if (page === 'docker') {
      setCurrentPage('docker')
    } else if (page === 'courses') {
      setCurrentPage('courses')
    } else if (page === 'trainers') {
      setCurrentPage('trainers')
    } else if (page === 'library') {
      setCurrentPage('library')
    } else if (page === 'resume') {
      setCurrentPage('resume')
    } else if (page === 'prospects') {
      setCurrentPage('prospects')
    } else if (page === 'interview') {
      setCurrentPage('interview')
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
        <LearnPage onNavigate={handleNavigate} isLoading={isLoading} />
      </>
    )
  }
  
  if (currentPage === 'career') {
    return (
      <>
        <Navigation key="career" onNavigate={handleNavigate} currentPage="career" />
        <CareerPage onNavigate={handleNavigate} isLoading={isLoading} />
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

  if (currentPage === 'sql') {
    return (
      <>
        <Navigation key="sql" onNavigate={handleNavigate} currentPage="sql" />
        <SQLTrainerPage onNavigate={handleNavigate} isLoading={isLoading} />
      </>
    )
  }

  if (currentPage === 'docker') {
    return (
      <>
        <Navigation key="docker" onNavigate={handleNavigate} currentPage="docker" />
        <DockerTrainerPage onNavigate={handleNavigate} isLoading={isLoading} />
      </>
    )
  }

  if (currentPage === 'courses') {
    return (
      <>
        <Navigation key="courses" onNavigate={handleNavigate} currentPage="courses" />
        <LearnPage onNavigate={handleNavigate} isLoading={isLoading} activeSection="courses" />
      </>
    )
  }

  if (currentPage === 'trainers') {
    return (
      <>
        <Navigation key="trainers" onNavigate={handleNavigate} currentPage="trainers" />
        <LearnPage onNavigate={handleNavigate} isLoading={isLoading} activeSection="trainers" />
      </>
    )
  }

  if (currentPage === 'library') {
    return (
      <>
        <Navigation key="library" onNavigate={handleNavigate} currentPage="library" />
        <LearnPage onNavigate={handleNavigate} isLoading={isLoading} activeSection="library" />
      </>
    )
  }

  if (currentPage === 'resume') {
    return (
      <>
        <Navigation key="resume" onNavigate={handleNavigate} currentPage="resume" />
        <CareerPage onNavigate={handleNavigate} isLoading={isLoading} activeSection="resume" />
      </>
    )
  }

  if (currentPage === 'prospects') {
    return (
      <>
        <Navigation key="prospects" onNavigate={handleNavigate} currentPage="prospects" />
        <CareerPage onNavigate={handleNavigate} isLoading={isLoading} activeSection="prospects" />
      </>
    )
  }

  if (currentPage === 'interview') {
    return (
      <>
        <Navigation key="interview" onNavigate={handleNavigate} currentPage="interview" />
        <InterviewTrainingPage onNavigate={handleNavigate} isLoading={isLoading} />
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
