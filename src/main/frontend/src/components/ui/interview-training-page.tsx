import React, { useState } from 'react'
import { AIHelper } from './ai-helper'
import { MorphingSquare } from './morphing-square'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  MessageSquare, 
  Brain, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Download
} from 'lucide-react'

interface InterviewTrainingPageProps {
  onNavigate: (page: string) => void
  isLoading: boolean
}

export function InterviewTrainingPage({ onNavigate, isLoading }: InterviewTrainingPageProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('')
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [isInterviewPaused, setIsInterviewPaused] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [interviewHistory, setInterviewHistory] = useState<Array<{question: string, answer: string}>>([])
  const [feedback, setFeedback] = useState<string>('')
  const [isFeedbackReady, setIsFeedbackReady] = useState(false)

  const grades = [
    { id: 'junior', title: 'Junior', description: '0-2 года опыта', color: 'from-green-500 to-emerald-500' },
    { id: 'middle', title: 'Middle', description: '2-4 года опыта', color: 'from-blue-500 to-cyan-500' },
    { id: 'senior', title: 'Senior', description: '4+ лет опыта', color: 'from-purple-500 to-pink-500' },
    { id: 'lead', title: 'Lead', description: '5+ лет + управление', color: 'from-orange-500 to-red-500' }
  ]

  const specialties = [
    { id: 'frontend', title: 'Frontend Developer', icon: '💻', color: 'from-blue-500 to-cyan-500' },
    { id: 'backend', title: 'Backend Developer', icon: '⚙️', color: 'from-green-500 to-emerald-500' },
    { id: 'fullstack', title: 'Full Stack Developer', icon: '🚀', color: 'from-purple-500 to-pink-500' },
    { id: 'devops', title: 'DevOps Engineer', icon: '🔧', color: 'from-orange-500 to-red-500' },
    { id: 'data', title: 'Data Scientist', icon: '📊', color: 'from-indigo-500 to-blue-500' },
    { id: 'mobile', title: 'Mobile Developer', icon: '📱', color: 'from-teal-500 to-green-500' }
  ]

  const sampleQuestions = {
    junior: {
      frontend: [
        "Расскажите о разнице между let, const и var в JavaScript",
        "Что такое DOM и как с ним работать?",
        "Объясните концепцию компонентов в React"
      ],
      backend: [
        "Что такое REST API?",
        "Объясните разницу между GET и POST запросами",
        "Что такое база данных и зачем она нужна?"
      ],
      fullstack: [
        "Какие технологии вы знаете для frontend и backend?",
        "Как происходит взаимодействие между клиентом и сервером?",
        "Что такое HTTP и как он работает?"
      ]
    },
    middle: {
      frontend: [
        "Расскажите о хуках в React и их жизненном цикле",
        "Как оптимизировать производительность React приложения?",
        "Что такое TypeScript и его преимущества?"
      ],
      backend: [
        "Объясните принципы SOLID",
        "Как работает аутентификация и авторизация?",
        "Что такое микросервисная архитектура?"
      ],
      fullstack: [
        "Как вы организуете архитектуру fullstack приложения?",
        "Расскажите о паттернах проектирования",
        "Как вы работаете с состоянием приложения?"
      ]
    },
    senior: {
      frontend: [
        "Как вы проектируете масштабируемую архитектуру frontend?",
        "Расскажите о паттернах state management",
        "Как вы обеспечиваете качество кода в команде?"
      ],
      backend: [
        "Как вы проектируете высоконагруженные системы?",
        "Расскажите о стратегиях кэширования",
        "Как вы обеспечиваете безопасность приложения?"
      ],
      fullstack: [
        "Как вы принимаете архитектурные решения?",
        "Расскажите о стратегиях развертывания",
        "Как вы организуете работу команды разработчиков?"
      ]
    }
  }

  const startInterview = () => {
    if (!selectedGrade || !selectedSpecialty) return
    
    setIsInterviewStarted(true)
    setIsInterviewPaused(false)
    setInterviewHistory([])
    setFeedback('')
    setIsFeedbackReady(false)
    
    // Генерируем первый вопрос
    const questions = sampleQuestions[selectedGrade as keyof typeof sampleQuestions]?.[selectedSpecialty as keyof typeof sampleQuestions.junior] || []
    if (questions.length > 0) {
      setCurrentQuestion(questions[0])
    }
  }

  const pauseInterview = () => {
    setIsInterviewPaused(true)
  }

  const resumeInterview = () => {
    setIsInterviewPaused(false)
  }

  const submitAnswer = () => {
    if (!userAnswer.trim()) return
    
    // Добавляем вопрос и ответ в историю
    setInterviewHistory(prev => [...prev, { question: currentQuestion, answer: userAnswer }])
    
    // Генерируем следующий вопрос
    const questions = sampleQuestions[selectedGrade as keyof typeof sampleQuestions]?.[selectedSpecialty as keyof typeof sampleQuestions.junior] || []
    const currentIndex = interviewHistory.length
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1])
    } else {
      // Интервью завершено, генерируем обратную связь
      generateFeedback()
    }
    
    setUserAnswer('')
  }

  const generateFeedback = () => {
    // Имитируем генерацию обратной связи ИИ
    const grade = grades.find(g => g.id === selectedGrade)?.title
    const specialty = specialties.find(s => s.id === selectedSpecialty)?.title
    
    const feedbackText = `Отличная работа на собеседовании на позицию ${specialty} уровня ${grade}!

Ваши сильные стороны:
✅ Хорошее понимание базовых концепций
✅ Логичное мышление и структурированные ответы
✅ Готовность к обучению и развитию

Области для улучшения:
🔧 Углубить знания в области ${specialty}
🔧 Больше практики с реальными проектами
🔧 Изучить современные инструменты и технологии

Рекомендации:
📚 Изучите дополнительные материалы по ${specialty}
💻 Создайте несколько проектов для портфолио
🤝 Участвуйте в open source проектах
📖 Читайте технические блоги и статьи

Общая оценка: ${Math.floor(Math.random() * 20 + 70)}/100

Продолжайте развиваться, и у вас все получится! 🚀`

    setFeedback(feedbackText)
    setIsFeedbackReady(true)
    setIsInterviewStarted(false)
  }

  const resetInterview = () => {
    setSelectedGrade('')
    setSelectedSpecialty('')
    setIsInterviewStarted(false)
    setIsInterviewPaused(false)
    setCurrentQuestion('')
    setUserAnswer('')
    setInterviewHistory([])
    setFeedback('')
    setIsFeedbackReady(false)
  }

  const downloadFeedback = () => {
    const element = document.createElement('a')
    const file = new Blob([feedback], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `feedback_${selectedSpecialty}_${selectedGrade}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <MorphingSquare message="Загрузка..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-8 pt-32">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Тренировка собеседований</h1>
          <p className="text-white/70 text-lg">Потренируйтесь с ИИ и получите обратную связь</p>
        </div>

        {!isInterviewStarted && !isFeedbackReady && (
          <div className="space-y-8">
            {/* Выбор грейда */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Выберите ваш уровень</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {grades.map((grade) => (
                  <motion.div
                    key={grade.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGrade(grade.id)}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                      selectedGrade === grade.id 
                        ? 'border-white/50 bg-white/20' 
                        : 'border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${grade.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center mb-2">{grade.title}</h3>
                    <p className="text-white/70 text-sm text-center">{grade.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Выбор специальности */}
            {selectedGrade && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Выберите специальность</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {specialties.map((specialty) => (
                    <motion.div
                      key={specialty.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSpecialty(specialty.id)}
                      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                        selectedSpecialty === specialty.id 
                          ? 'border-white/50 bg-white/20' 
                          : 'border-white/20 hover:bg-white/15'
                      }`}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${specialty.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-white text-2xl">{specialty.icon}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white text-center">{specialty.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Кнопка начала */}
            {selectedGrade && selectedSpecialty && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <button
                  onClick={startInterview}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Начать собеседование</span>
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Интервью */}
        {isInterviewStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Заголовок интервью */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Собеседование в процессе</h2>
                  <p className="text-white/70">
                    {grades.find(g => g.id === selectedGrade)?.title} {specialties.find(s => s.id === selectedSpecialty)?.title}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {isInterviewPaused ? (
                    <button
                      onClick={resumeInterview}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Продолжить</span>
                    </button>
                  ) : (
                    <button
                      onClick={pauseInterview}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Пауза</span>
                    </button>
                  )}
                  <button
                    onClick={resetInterview}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Сброс</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Текущий вопрос */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Вопрос {interviewHistory.length + 1}</h3>
                  <p className="text-white/60 text-sm">Ответьте на вопрос интервьюера</p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <p className="text-white text-lg">{currentQuestion}</p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Введите ваш ответ..."
                  className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-white/40"
                  disabled={isInterviewPaused}
                />
                
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim() || isInterviewPaused}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Отправить ответ
                </button>
              </div>
            </div>

            {/* История интервью */}
            {interviewHistory.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">История интервью</h3>
                <div className="space-y-4">
                  {interviewHistory.map((item, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-white/80 text-sm mb-2">
                          <strong>Вопрос {index + 1}:</strong>
                        </p>
                        <p className="text-white mb-3">{item.question}</p>
                        <p className="text-white/80 text-sm mb-2">
                          <strong>Ваш ответ:</strong>
                        </p>
                        <p className="text-white">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Обратная связь */}
        {isFeedbackReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Обратная связь от ИИ</h2>
                  <p className="text-white/70">Анализ вашего собеседования</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <pre className="text-white whitespace-pre-wrap font-sans">{feedback}</pre>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={downloadFeedback}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Скачать отзыв</span>
                </button>
                <button
                  onClick={resetInterview}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Новое собеседование</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* AI Помощник */}
      <AIHelper />
    </div>
  )
}
