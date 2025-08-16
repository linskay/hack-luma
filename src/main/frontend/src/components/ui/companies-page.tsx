"use client"

import React, { useState } from 'react'
import { GradientButton } from './gradient-button'
import { AIHelper } from './ai-helper'
import { MorphingSquare } from './morphing-square'

interface CompaniesPageProps {
  onNavigate: (page: string) => void
  isLoading: boolean
}

interface CompetencyMatrix {
  [key: string]: {
    [level: string]: {
      description: string
      status: 'green' | 'yellow' | 'red' | 'none'
    }
  }
}

export function CompaniesPage({ onNavigate, isLoading }: CompaniesPageProps) {
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [competencyMatrix, setCompetencyMatrix] = useState<CompetencyMatrix>({
    'Java & OOP': {
      'Junior': { description: 'Знание Java и ООП', status: 'none' },
      'Middle': { description: 'Знание синтаксиса, классов, наследования', status: 'none' },
      'Senior': { description: 'Дженерики, коллекции, исключения', status: 'none' },
      'Lead/Architect': { description: 'Многопоточность, JVM, оптимизация', status: 'none' }
    },
    'Spring Framework': {
      'Junior': { description: 'Создание простого Spring Boot проекта', status: 'none' },
      'Middle': { description: 'Конфигурация, REST, контроллеры, безопасность', status: 'none' },
      'Senior': { description: 'OOP, микросервисы', status: 'none' },
      'Lead/Architect': { description: 'Встраивание событий, масштабирование', status: 'none' }
    },
    'База данных': {
      'Junior': { description: 'Простые SELECT запросы', status: 'none' },
      'Middle': { description: 'JOIN, индексы, транзакции', status: 'none' },
      'Senior': { description: 'Тонкая настройка СУБД', status: 'none' },
      'Lead/Architect': { description: 'Репликация, шардинг, архитектура системы', status: 'none' }
    },
    'Архитектура': {
      'Junior': { description: 'Понимание MVC', status: 'none' },
      'Middle': { description: 'Паттерны проектирования', status: 'none' },
      'Senior': { description: 'Проектирование сервисов', status: 'none' },
      'Lead/Architect': { description: 'Стратегическое видение', status: 'none' }
    },
    'Коммуникация': {
      'Junior': { description: 'Коммуникация в команде, умение задавать вопросы', status: 'none' },
      'Middle': { description: 'Проведение код-ревью', status: 'none' },
      'Senior': { description: 'Менторинг, фасилитация', status: 'none' },
      'Lead/Architect': { description: 'Ведение технических митапов', status: 'none' }
    }
  })

  const companies = [
    { id: '1', name: 'TechCorp', employees: ['Иван Петров', 'Мария Сидорова', 'Алексей Козлов'] },
    { id: '2', name: 'InnovateSoft', employees: ['Елена Волкова', 'Дмитрий Морозов', 'Анна Соколова'] },
    { id: '3', name: 'DigitalSolutions', employees: ['Сергей Иванов', 'Ольга Козлова', 'Павел Смирнов'] }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-500'
      case 'yellow': return 'bg-yellow-500'
      case 'red': return 'bg-red-500'
      default: return 'bg-gray-300'
    }
  }

  const handleStatusChange = (competency: string, level: string, status: 'green' | 'yellow' | 'red' | 'none') => {
    setCompetencyMatrix(prev => ({
      ...prev,
      [competency]: {
        ...prev[competency],
        [level]: {
          ...prev[competency][level],
          status
        }
      }
    }))
  }

  const generateReport = () => {
    // Здесь будет логика генерации отчета с помощью ИИ
    console.log('Генерация отчета для:', selectedEmployee, competencyMatrix)
  }

  return (
    <div className="min-h-screen">
      {/* Основной контент */}
      <div className="max-w-7xl mx-auto p-8 pt-32">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Система оценки компетенций</h1>
          <p className="text-white/70 text-lg">Анализ и развитие навыков разработчиков с помощью ИИ</p>
        </div>

        {/* Выбор компании и сотрудника */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Выбор компании</h3>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите компанию</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Выбор сотрудника</h3>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedCompany}
            >
              <option value="">Выберите сотрудника</option>
              {selectedCompany && companies.find(c => c.id === selectedCompany)?.employees.map(employee => (
                <option key={employee} value={employee}>{employee}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Матрица компетенций */}
        {selectedEmployee && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">Матрица компетенций: {selectedEmployee}</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-3">Компетенция</th>
                    <th className="text-center p-3">Junior</th>
                    <th className="text-center p-3">Middle</th>
                    <th className="text-center p-3">Senior</th>
                    <th className="text-center p-3">Lead/Architect</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(competencyMatrix).map(([competency, levels]) => (
                    <tr key={competency} className="border-b border-white/10">
                      <td className="p-3 font-medium">{competency}</td>
                      {Object.entries(levels).map(([level, data]) => (
                        <td key={level} className="p-3 text-center">
                          <div className="space-y-2">
                            <div className="text-xs text-white/60">{data.description}</div>
                            <div className="flex justify-center space-x-1">
                              <button
                                onClick={() => handleStatusChange(competency, level, 'green')}
                                className={`w-4 h-4 rounded-full ${getStatusColor(data.status === 'green' ? 'green' : 'none')} hover:bg-green-400 transition-colors`}
                                title="Отлично"
                              />
                              <button
                                onClick={() => handleStatusChange(competency, level, 'yellow')}
                                className={`w-4 h-4 rounded-full ${getStatusColor(data.status === 'yellow' ? 'yellow' : 'none')} hover:bg-yellow-400 transition-colors`}
                                title="Хорошо"
                              />
                              <button
                                onClick={() => handleStatusChange(competency, level, 'red')}
                                className={`w-4 h-4 rounded-full ${getStatusColor(data.status === 'red' ? 'red' : 'none')} hover:bg-red-400 transition-colors`}
                                title="Требует улучшения"
                              />
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Форматы оценивания */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Форматы оценивания</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-2">Live Coding</h4>
              <p className="text-white/60 text-sm">Алгоритмы, структуры данных</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-2">Ситуационные кейсы</h4>
              <p className="text-white/60 text-sm">Разрешение конфликтов, принятие решений</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-2">Проектная работа</h4>
              <p className="text-white/60 text-sm">Мини-проекты с автоматической проверкой</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-2">Тестирование</h4>
              <p className="text-white/60 text-sm">Теория, знание технологий</p>
            </div>
          </div>
        </div>

        {/* Кнопка генерации отчета */}
        {selectedEmployee && (
          <div className="text-center">
            <GradientButton onClick={generateReport} variant="variant" size="lg">
              Сгенерировать ИИ отчет
            </GradientButton>
          </div>
        )}
      </div>

      {/* Спиннер загрузки */}
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <MorphingSquare message="Загрузка системы..." />
        </div>
      )}

      {/* AI Помощник */}
      <AIHelper />
    </div>
  )
}
