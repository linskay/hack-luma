import React from 'react'
import { GradientButton } from './gradient-button'
import { AIHelper } from './ai-helper'
import GlitchLoader from './GlitchLoader'

interface ProfilePageProps {
  onNavigate: (page: string) => void
  isLoading: boolean
}

export function ProfilePage({ onNavigate, isLoading }: ProfilePageProps) {
  return (
    <div className="min-h-screen">
      {/* Основной контент */}
      <div className="max-w-6xl mx-auto p-8 pt-32">
        {/* Заголовок профиля */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Профиль пользователя</h1>
          <p className="text-white/70 text-lg">Добро пожаловать в систему обучения!</p>
        </div>

        {/* Карточки с информацией */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Карточка прогресса */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-white/80 text-sm mb-2">Общий прогресс</div>
            <div className="text-3xl font-bold text-white mb-2">67%</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: '67%' }}></div>
            </div>
          </div>

          {/* Карточка курсов */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-white/80 text-sm mb-2">Курсов пройдено</div>
            <div className="text-3xl font-bold text-white mb-2">12</div>
            <div className="text-white/60">из 18 доступных</div>
          </div>

          {/* Карточка времени */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-white/80 text-sm mb-2">Время обучения</div>
            <div className="text-3xl font-bold text-white mb-2">47ч</div>
            <div className="text-white/60">за последний месяц</div>
          </div>
        </div>

        {/* Последние достижения */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8 hover:bg-white/15 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">Последние достижения</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black text-sm">🏆</span>
              </div>
              <div>
                <div className="text-white font-medium">Первый курс завершен</div>
                <div className="text-white/60 text-sm">2 дня назад</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-black text-sm">⭐</span>
              </div>
              <div>
                <div className="text-white font-medium">5 дней подряд</div>
                <div className="text-white/60 text-sm">Серия обучения</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-black text-sm">🚀</span>
              </div>
              <div>
                <div className="text-white font-medium">Быстрый ученик</div>
                <div className="text-white/60 text-sm">Завершил курс за 3 дня</div>
              </div>
            </div>
          </div>
        </div>

        {/* Рекомендуемые курсы */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">Рекомендуемые курсы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-white font-medium mb-2">Основы программирования</div>
              <div className="text-white/60 text-sm mb-3">Начните свой путь в IT</div>
              <GradientButton variant="variant" size="sm">
                Начать курс
              </GradientButton>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-white font-medium mb-2">Web разработка</div>
              <div className="text-white/60 text-sm mb-3">Создавайте современные сайты</div>
              <GradientButton variant="variant" size="sm">
                Начать курс
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
      
      
      
      {/* AI Помощник */}
      <AIHelper />
    </div>
  )
}
