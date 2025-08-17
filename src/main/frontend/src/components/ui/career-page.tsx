import React, { useState, useEffect } from 'react'
import { GradientButton } from './gradient-button'
import { AIHelper } from './ai-helper'
import { MorphingSquare } from './morphing-square'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, TrendingUp, Send, Briefcase, User, Mail, Star, Target, Zap, CheckCircle, Clock, DollarSign, Brain, MessageSquare, Link } from 'lucide-react'

interface CareerPageProps {
  onNavigate: (page: string) => void
  isLoading: boolean
  activeSection?: string
}

export function CareerPage({ onNavigate, isLoading, activeSection = 'resume' }: CareerPageProps) {
  const [currentSection, setCurrentSection] = useState<string>(activeSection)
  const [isAutoReplyEnabled, setIsAutoReplyEnabled] = useState(false)

  // Обновляем активную секцию при изменении activeSection
  useEffect(() => {
    if (activeSection && activeSection !== currentSection) {
      setCurrentSection(activeSection)
    }
  }, [activeSection, currentSection])

  const resumeData = {
    personalInfo: {
      name: 'Александр Петров',
      title: 'Full Stack Developer',
      experience: '3 года',
      location: 'Москва',
      email: 'alex.petrov@email.com',
      phone: '+7 (999) 123-45-67'
    },
    skills: [
      { name: 'JavaScript', level: 90, category: 'Frontend' },
      { name: 'React', level: 85, category: 'Frontend' },
      { name: 'Node.js', level: 80, category: 'Backend' },
      { name: 'Python', level: 75, category: 'Backend' },
      { name: 'Docker', level: 70, category: 'DevOps' },
      { name: 'Git', level: 85, category: 'Tools' }
    ],
    experience: [
      {
        company: 'TechCorp',
        position: 'Frontend Developer',
        period: '2022 - 2024',
        description: 'Разработка веб-приложений на React, работа с REST API'
      },
      {
        company: 'StartUp Inc',
        position: 'Junior Developer',
        period: '2021 - 2022',
        description: 'Создание пользовательских интерфейсов, интеграция с бэкендом'
      }
    ],
    education: [
      {
        institution: 'Московский Технический Университет',
        degree: 'Бакалавр информатики',
        period: '2017 - 2021'
      }
    ]
  }

  const careerPaths = [
    {
      title: 'Frontend Developer',
      description: 'Создавайте красивые и функциональные веб-интерфейсы',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Vue.js', 'TypeScript'],
      salary: '80,000 - 150,000 ₽',
      demand: 'Высокий',
      color: 'from-blue-500 to-cyan-500',
      icon: '💻'
    },
    {
      title: 'Backend Developer',
      description: 'Разрабатывайте серверную часть приложений',
      skills: ['Java', 'Spring', 'Python', 'Node.js', 'Databases'],
      salary: '100,000 - 200,000 ₽',
      demand: 'Очень высокий',
      color: 'from-green-500 to-emerald-500',
      icon: '⚙️'
    },
    {
      title: 'Full Stack Developer',
      description: 'Универсальный разработчик для всех задач',
      skills: ['Frontend + Backend', 'DevOps', 'Cloud', 'Architecture'],
      salary: '120,000 - 250,000 ₽',
      demand: 'Очень высокий',
      color: 'from-purple-500 to-pink-500',
      icon: '🚀'
    },
    {
      title: 'Data Scientist',
      description: 'Анализируйте данные и создавайте AI модели',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Big Data'],
      salary: '150,000 - 300,000 ₽',
      demand: 'Высокий',
      color: 'from-orange-500 to-red-500',
      icon: '📊'
    },
    {
      title: 'DevOps Engineer',
      description: 'Автоматизируйте процессы разработки и развертывания',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud', 'Linux'],
      salary: '130,000 - 250,000 ₽',
      demand: 'Высокий',
      color: 'from-indigo-500 to-blue-500',
      icon: '🔧'
    },
    {
      title: 'Mobile Developer',
      description: 'Создавайте приложения для iOS и Android',
      skills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Mobile UI/UX'],
      salary: '90,000 - 180,000 ₽',
      demand: 'Средний',
      color: 'from-teal-500 to-green-500',
      icon: '📱'
    }
  ]

  const companies = [
    { name: 'Яндекс', logo: '🔍', description: 'Крупнейшая IT компания России' },
    { name: 'VK', logo: '💙', description: 'Социальные сети и технологии' },
    { name: 'Сбер', logo: '🟢', description: 'Банковские технологии' },
    { name: 'Тинькофф', logo: '🟡', description: 'Финансовые технологии' },
    { name: 'Ozon', logo: '🟠', description: 'E-commerce платформа' },
    { name: 'Wildberries', logo: '🟣', description: 'Онлайн-магазин' }
  ]

  const marketStats = [
    { label: 'Рост зарплат в IT', value: '+15%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Открытых вакансий', value: '50,000+', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { label: 'Трудоустройство после курсов', value: '95%', icon: CheckCircle, color: 'from-purple-500 to-pink-500' }
  ]

  return (
    <div className="min-h-screen">
      {/* Основной контент */}
      <div className="max-w-6xl mx-auto p-8 pt-32">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Карьера в IT</h1>
          <p className="text-white/70 text-lg">Постройте успешную карьеру в технологиях!</p>
        </div>

        {/* Контент разделов */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Резюме */}
            {currentSection === 'resume' && (
              <div className="space-y-8">
                {/* Автогенерация резюме с ИИ */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Автогенерация резюме с ИИ</h3>
                        <p className="text-white/70 text-sm">Создайте идеальное резюме с помощью искусственного интеллекта</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        Новинка
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Анализ существующего резюме</span>
                      </h4>
                      <p className="text-white/60 text-sm mb-3">ИИ проанализирует ваше текущее резюме и предложит улучшения</p>
                      <div className="flex items-center space-x-2 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Доступно</span>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>ИИ собеседование</span>
                      </h4>
                      <p className="text-white/60 text-sm mb-3">Побеседуйте с ИИ о ваших навыках и опыте</p>
                      <div className="flex items-center space-x-2 text-blue-400 text-sm">
                        <Target className="w-4 h-4" />
                        <span>Рекомендуется</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
                      <Link className="w-4 h-4" />
                      <span>Адаптация под вакансию</span>
                    </h4>
                    <p className="text-white/60 text-sm mb-3">ИИ создаст резюме, идеально подходящее под конкретную вакансию, исходя из ваших навыков и требований работодателя</p>
                    <div className="flex items-center space-x-2 text-purple-400 text-sm">
                      <Zap className="w-4 h-4" />
                      <span>Умная настройка</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                      Начать автогенерацию резюме
                    </button>
                  </div>
                </div>

                {/* Автоотклики на вакансии */}
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Автоотклики на вакансии</h3>
                        <p className="text-white/70 text-sm">Автоматизируйте процесс поиска работы</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isAutoReplyEnabled 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {isAutoReplyEnabled ? 'Включено' : 'Выключено'}
                      </span>
                      <button
                        onClick={() => setIsAutoReplyEnabled(!isAutoReplyEnabled)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          isAutoReplyEnabled
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {isAutoReplyEnabled ? 'Отключить' : 'Включить'}
                      </button>
                    </div>
                  </div>

                  {isAutoReplyEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-4">
                          <h4 className="text-white font-medium mb-2">Автогенерация сопроводительного письма</h4>
                          <p className="text-white/60 text-sm mb-3">AI создаст персональное письмо под каждую вакансию</p>
                          <div className="flex items-center space-x-2 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Активно</span>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                          <h4 className="text-white font-medium mb-2">Умный поиск вакансий</h4>
                          <p className="text-white/60 text-sm mb-3">Автоматический поиск подходящих позиций</p>
                          <div className="flex items-center space-x-2 text-blue-400 text-sm">
                            <Target className="w-4 h-4" />
                            <span>Настроено</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <h4 className="text-white font-medium mb-2">Статистика автооткликов</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-white">24</div>
                            <div className="text-white/60 text-sm">Отправлено</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">8</div>
                            <div className="text-white/60 text-sm">Ответов</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">3</div>
                            <div className="text-white/60 text-sm">Интервью</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Основное резюме */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{resumeData.personalInfo.name}</h2>
                      <p className="text-xl text-white/70">{resumeData.personalInfo.title}</p>
                      <div className="flex items-center space-x-4 text-white/60 text-sm mt-2">
                        <span>Опыт: {resumeData.personalInfo.experience}</span>
                        <span>📍 {resumeData.personalInfo.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Навыки</h3>
                      <div className="space-y-3">
                        {resumeData.skills.map((skill, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/80">{skill.name}</span>
                              <span className="text-white/60">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Опыт работы</h3>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-purple-500 pl-4">
                            <h4 className="text-white font-medium">{exp.position}</h4>
                            <p className="text-white/70 text-sm">{exp.company}</p>
                            <p className="text-white/60 text-xs">{exp.period}</p>
                            <p className="text-white/80 text-sm mt-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Образование</h3>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">{edu.degree}</p>
                          <p className="text-white/70 text-sm">{edu.institution}</p>
                          <p className="text-white/60 text-xs">{edu.period}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Перспективы */}
            {currentSection === 'prospects' && (
              <div className="space-y-8">
                {/* Статистика рынка */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {marketStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-white/70">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Карьерные пути */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Популярные карьерные пути</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {careerPaths.map((path, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${path.color} mb-4 flex items-center justify-center`}>
                          <span className="text-white text-xl">{path.icon}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{path.title}</h3>
                        <p className="text-white/70 text-sm mb-4">{path.description}</p>
                        
                        <div className="mb-4">
                          <div className="text-white/80 text-sm mb-2">Ключевые навыки:</div>
                          <div className="flex flex-wrap gap-2">
                            {path.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                                {skill}
                              </span>
                            ))}
                            {path.skills.length > 3 && (
                              <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">
                                +{path.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Зарплата:</span>
                            <span className="text-white font-medium">{path.salary}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/60">Спрос:</span>
                            <span className="text-white font-medium">{path.demand}</span>
                          </div>
                        </div>

                        <GradientButton variant="variant" size="sm" className="w-full">
                          Узнать больше
                        </GradientButton>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Компании-партнеры */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Компании-партнеры</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {companies.map((company, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105"
                      >
                        <div className="text-3xl mb-2">{company.logo}</div>
                        <div className="text-white font-medium text-sm">{company.name}</div>
                        <div className="text-white/60 text-xs">{company.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Советы по карьере */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Советы для успешной карьеры в IT</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-black text-xs">1</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Постоянное обучение</div>
                          <div className="text-white/60 text-sm">Технологии развиваются быстро, важно быть в курсе трендов</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-black text-xs">2</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Практические проекты</div>
                          <div className="text-white/60 text-sm">Создавайте портфолио с реальными проектами</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-black text-xs">3</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Сетевое взаимодействие</div>
                          <div className="text-white/60 text-sm">Участвуйте в IT сообществах и конференциях</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-black text-xs">4</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Soft skills</div>
                          <div className="text-white/60 text-sm">Развивайте коммуникацию и работу в команде</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Спиннер загрузки */}
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <MorphingSquare message="Загрузка карьеры..." />
        </div>
      )}
      
      {/* AI Помощник */}
      <AIHelper />
    </div>
  )
}
