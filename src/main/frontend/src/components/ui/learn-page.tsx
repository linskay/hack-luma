import React, { useState } from 'react'
import { GradientButton } from './gradient-button'
import { AIHelper } from './ai-helper'

interface LearnPageProps {
  onNavigate: (page: string) => void
}

export function LearnPage({ onNavigate }: LearnPageProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const courses = [
    {
      id: 'java-basics',
      title: 'Основы Java',
      description: 'Изучите основы объектно-ориентированного программирования на Java',
      duration: '8 недель',
      level: 'Начинающий',
      topics: ['Классы и объекты', 'Наследование', 'Полиморфизм', 'Инкапсуляция'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'spring-framework',
      title: 'Spring Framework',
      description: 'Создавайте современные веб-приложения с Spring',
      duration: '10 недель',
      level: 'Средний',
      topics: ['IoC контейнер', 'AOP', 'Spring Boot', 'REST API'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'react-development',
      title: 'React разработка',
      description: 'Создавайте интерактивные пользовательские интерфейсы',
      duration: '6 недель',
      level: 'Средний',
      topics: ['Компоненты', 'Хуки', 'Роутинг', 'State Management'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'database-design',
      title: 'Проектирование БД',
      description: 'Изучите принципы проектирования баз данных',
      duration: '4 недели',
      level: 'Начинающий',
      topics: ['ER модели', 'Нормализация', 'SQL', 'Индексы'],
      color: 'from-orange-500 to-red-500'
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
                className="relative px-6 py-3 text-white/80 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 group overflow-hidden bg-white/20"
              >
                <span className="relative z-10">Учиться</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
              <button
                onClick={() => onNavigate('prices')}
                className="relative px-6 py-3 text-white/80 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 group overflow-hidden"
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
          <h1 className="text-4xl font-bold text-white mb-4">Обучение программированию</h1>
          <p className="text-white/70 text-lg">Выберите курс и начните свой путь в IT!</p>
        </div>

        {/* Курсы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedCourse === course.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedCourse(course.id)}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">
                  {course.id === 'java-basics' && '☕'}
                  {course.id === 'spring-framework' && '🌱'}
                  {course.id === 'react-development' && '⚛️'}
                  {course.id === 'database-design' && '🗄️'}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-white/70 text-sm mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60 text-sm">{course.duration}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">{course.level}</span>
              </div>
              
              <div className="space-y-2 mb-4">
                {course.topics.slice(0, 3).map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">{topic}</span>
                  </div>
                ))}
                {course.topics.length > 3 && (
                  <div className="text-white/60 text-sm">+{course.topics.length - 3} тем</div>
                )}
              </div>
              
              <GradientButton variant="variant" size="sm" className="w-full">
                Начать курс
              </GradientButton>
            </div>
          ))}
        </div>

        {/* Выбранный курс */}
        {selectedCourse && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Детали курса: {courses.find(c => c.id === selectedCourse)?.title}
            </h3>
            <p className="text-white/70 mb-4">
              Готовы начать обучение? Нажмите кнопку ниже, чтобы приступить к первому уроку.
            </p>
            <div className="flex space-x-4">
              <GradientButton variant="variant">
                Начать обучение
              </GradientButton>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-3 text-white/80 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* AI Помощник */}
      <AIHelper />
    </div>
  )
}
