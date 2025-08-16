import React, { useState, useEffect } from 'react'
import { GradientButton } from './gradient-button'
import { AIHelper } from './ai-helper'
import { MorphingSquare } from './morphing-square'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, BookOpen, Dumbbell, Library, GitBranch, Database, Terminal, Ship, Server, Code, Globe, Shield } from 'lucide-react'

interface LearnPageProps {
  onNavigate: (page: string) => void
  isLoading: boolean
  currentSubPage?: string
}

export function LearnPage({ onNavigate, isLoading, currentSubPage = 'courses' }: LearnPageProps) {
  const [activeSection, setActiveSection] = useState<string>(currentSubPage)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Обновляем активную секцию при изменении currentSubPage
  useEffect(() => {
    if (currentSubPage && currentSubPage !== activeSection) {
      setActiveSection(currentSubPage)
    }
  }, [currentSubPage, activeSection])

  const sections = [
    { id: 'courses', title: 'Курсы', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { id: 'trainers', title: 'Тренажеры', icon: Dumbbell, color: 'from-green-500 to-emerald-500' },
    { id: 'library', title: 'Библиотека', icon: Library, color: 'from-purple-500 to-pink-500' }
  ]

  const courses = [
    {
      id: 'java-basics',
      title: 'Основы Java',
      description: 'Изучите основы объектно-ориентированного программирования на Java',
      duration: '8 недель',
      level: 'Начинающий',
      topics: ['Классы и объекты', 'Наследование', 'Полиморфизм', 'Инкапсуляция'],
      color: 'from-blue-500 to-cyan-500',
      icon: '☕'
    },
    {
      id: 'spring-framework',
      title: 'Spring Framework',
      description: 'Создавайте современные веб-приложения с Spring',
      duration: '10 недель',
      level: 'Средний',
      topics: ['IoC контейнер', 'AOP', 'Spring Boot', 'REST API'],
      color: 'from-green-500 to-emerald-500',
      icon: '🌱'
    },
    {
      id: 'react-development',
      title: 'React разработка',
      description: 'Создавайте интерактивные пользовательские интерфейсы',
      duration: '6 недель',
      level: 'Средний',
      topics: ['Компоненты', 'Хуки', 'Роутинг', 'State Management'],
      color: 'from-purple-500 to-pink-500',
      icon: '⚛️'
    },
    {
      id: 'database-design',
      title: 'Проектирование БД',
      description: 'Изучите принципы проектирования баз данных',
      duration: '4 недели',
      level: 'Начинающий',
      topics: ['ER модели', 'Нормализация', 'SQL', 'Индексы'],
      color: 'from-orange-500 to-red-500',
      icon: '🗄️'
    }
  ]

  const trainers = [
    {
      id: 'git',
      title: 'Git & GitHub',
      description: 'Система контроля версий и совместная разработка',
      difficulty: 'Средний',
      exercises: 15,
      color: 'from-orange-500 to-red-500',
      icon: GitBranch
    },
    {
      id: 'kubernetes',
      title: 'Kubernetes',
      description: 'Оркестрация контейнеров и масштабирование',
      difficulty: 'Продвинутый',
      exercises: 20,
      color: 'from-blue-500 to-indigo-500',
      icon: Ship
    },
    {
      id: 'sql',
      title: 'SQL & Базы данных',
      description: 'Работа с реляционными базами данных',
      difficulty: 'Средний',
      exercises: 18,
      color: 'from-green-500 to-teal-500',
      icon: Database
    },
    {
      id: 'bash',
      title: 'Bash & Linux',
      description: 'Командная строка и автоматизация',
      difficulty: 'Начинающий',
      exercises: 12,
      color: 'from-purple-500 to-pink-500',
      icon: Terminal
    },
    {
      id: 'docker',
      title: 'Docker',
      description: 'Контейнеризация приложений',
      difficulty: 'Средний',
      exercises: 16,
      color: 'from-cyan-500 to-blue-500',
      icon: Server
    },
    {
      id: 'devops',
      title: 'DevOps практики',
      description: 'CI/CD и автоматизация развертывания',
      difficulty: 'Продвинутый',
      exercises: 22,
      color: 'from-yellow-500 to-orange-500',
      icon: Code
    }
  ]

  const libraryItems = [
    {
      id: 'web-dev',
      title: 'Веб-разработка',
      description: 'HTML, CSS, JavaScript, современные фреймворки',
      resources: 45,
      color: 'from-blue-500 to-purple-500',
      icon: Globe
    },
    {
      id: 'mobile-dev',
      title: 'Мобильная разработка',
      description: 'React Native, Flutter, нативные приложения',
      resources: 38,
      color: 'from-green-500 to-blue-500',
      icon: Code
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Нейронные сети, алгоритмы, фреймворки',
      resources: 52,
      color: 'from-purple-500 to-pink-500',
      icon: Shield
    }
  ]

  const currentSection = sections.find(s => s.id === activeSection)

  return (
    <div className="min-h-screen">
      {/* Основной контент */}
      <div className="max-w-6xl mx-auto p-8 pt-32">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Обучение программированию</h1>
          <p className="text-white/70 text-lg">Выберите раздел и начните свой путь в IT!</p>
        </div>

        {/* Анимированный выпадающий список */}
        <div className="relative mb-12">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${currentSection?.color} rounded-xl flex items-center justify-center`}>
                  {currentSection && <currentSection.icon className="w-6 h-6 text-white" />}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white">{currentSection?.title}</h3>
                  <p className="text-white/60 text-sm">Выберите раздел обучения</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-white/60" />
              </motion.div>
            </div>
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-full max-w-md z-50"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full p-4 flex items-center space-x-4 hover:bg-white/10 transition-all duration-200 ${
                        activeSection === section.id ? 'bg-white/20' : ''
                      } ${index !== sections.length - 1 ? 'border-b border-white/10' : ''}`}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center`}>
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{section.title}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Контент разделов */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Курсы */}
            {activeSection === 'courses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-2xl">{course.icon}</span>
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
                  </motion.div>
                ))}
              </div>
            )}

            {/* Тренажеры */}
            {activeSection === 'trainers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer, index) => (
                  <motion.div
                    key={trainer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${trainer.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <trainer.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{trainer.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{trainer.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">{trainer.difficulty}</span>
                      <span className="text-white/60 text-sm">{trainer.exercises} упражнений</span>
                    </div>
                    
                    <GradientButton variant="variant" size="sm" className="w-full">
                      Начать тренировку
                    </GradientButton>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Библиотека */}
            {activeSection === 'library' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {libraryItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/60 text-sm">{item.resources} ресурсов</span>
                    </div>
                    
                    <GradientButton variant="variant" size="sm" className="w-full">
                      Открыть библиотеку
                    </GradientButton>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Спиннер загрузки */}
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <MorphingSquare message="Загрузка..." />
        </div>
      )}
      
      {/* AI Помощник */}
      <AIHelper />
    </div>
  )
}
