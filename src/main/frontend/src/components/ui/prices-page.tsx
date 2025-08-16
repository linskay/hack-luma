import React from 'react'
import { GradientButton } from './gradient-button'
import { AIHelper } from './ai-helper'

interface PricesPageProps {
  onNavigate: (page: string) => void
}

export function PricesPage({ onNavigate }: PricesPageProps) {
  const plans = [
    {
      name: 'Базовый',
      price: '0',
      currency: '₽',
      period: 'навсегда',
      features: [
        'Доступ к базовым курсам',
        'AI помощник (5 вопросов в день)',
        'Сообщество разработчиков',
        'Сертификат по завершении'
      ],
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      name: 'Стандарт',
      price: '1999',
      currency: '₽',
      period: 'в месяц',
      features: [
        'Все курсы без ограничений',
        'AI помощник без ограничений',
        'Персональный ментор',
        'Практические проекты',
        'Поддержка 24/7',
        'Премиум сертификаты'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'Премиум',
      price: '3999',
      currency: '₽',
      period: 'в месяц',
      features: [
        'Все возможности Стандарт',
        'Индивидуальный план обучения',
        'Карьерное консультирование',
        'Стажировка в IT компаниях',
        'Помощь с трудоустройством',
        'Эксклюзивные мастер-классы'
      ],
      color: 'from-yellow-500 to-orange-500',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              &lt;BOO!/&gt;
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate('profile')}
                className="relative px-6 py-3 text-white/80 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 group overflow-hidden"
              >
                <span className="relative z-10">Профиль</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
              <button
                onClick={() => onNavigate('learn')}
                className="relative px-6 py-3 text-white/80 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 group overflow-hidden"
              >
                <span className="relative z-10">Учиться</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
              <button
                onClick={() => onNavigate('prices')}
                className="relative px-6 py-3 text-white/80 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 group overflow-hidden bg-white/20"
              >
                <span className="relative z-10">Цены</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
              <button
                onClick={() => onNavigate('logout')}
                className="relative px-6 py-3 text-white/80 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 group overflow-hidden"
              >
                <span className="relative z-10">Выход</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <div className="max-w-6xl mx-auto p-8 pt-32">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Тарифные планы</h1>
          <p className="text-white/70 text-lg">Выберите подходящий план для вашего обучения</p>
        </div>

        {/* Тарифные планы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/70 ml-1">{plan.currency}</span>
                  <span className="text-white/50 ml-1">/{plan.period}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <GradientButton 
                variant="variant" 
                className={`w-full bg-gradient-to-r ${plan.color} hover:from-opacity-80 hover:to-opacity-80`}
              >
                {plan.price === '0' ? 'Начать бесплатно' : 'Выбрать план'}
              </GradientButton>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Что включено во все планы?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/80">Доступ к мобильному приложению</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/80">Регулярные обновления курсов</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/80">Техническая поддержка</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/80">Доступ к библиотеке ресурсов</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/80">Участие в хакатонах</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span className="text-white/80">Скидки на IT конференции</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Помощник */}
      <AIHelper />
    </div>
  )
}
