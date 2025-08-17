import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  LogOut,
  ChevronDown,
  Dumbbell,
  Library,
  FileText,
  Briefcase,
  MessageSquare
} from 'lucide-react'

interface NavigationProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)

  const handleMouseEnter = (menuId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setHoveredMenu(menuId)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredMenu(null)
    }, 150) // Задержка 150ms для плавного перехода
    setHoverTimeout(timeout)
  }

  const menuItems = [
    {
      id: 'profile',
      title: 'Профиль',
      icon: User,
      color: 'from-blue-500 to-purple-500',
      hoverColor: 'from-blue-500/20 to-purple-500/20',
      activeColor: 'from-blue-500/30 to-purple-500/30',
      clickable: true
    },
    {
      id: 'learn',
      title: 'Обучение',
      icon: BookOpen,
      color: 'from-green-500 to-blue-500',
      hoverColor: 'from-green-500/20 to-blue-500/20',
      activeColor: 'from-green-500/30 to-blue-500/30',
      clickable: false,
      submenu: [
        { id: 'courses', title: 'Курсы', icon: BookOpen, description: 'Изучайте программирование' },
        { id: 'trainers', title: 'Тренажеры', icon: Dumbbell, description: 'Практические упражнения' },
        { id: 'library', title: 'Библиотека', icon: Library, description: 'Ресурсы и материалы' }
      ]
    },
    {
      id: 'career',
      title: 'Карьера',
      icon: Briefcase,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'from-purple-500/20 to-pink-500/20',
      activeColor: 'from-purple-500/30 to-pink-500/30',
      clickable: false,
      submenu: [
        { id: 'resume', title: 'Резюме', icon: FileText },
        { id: 'prospects', title: 'Перспективы', icon: TrendingUp },
        { id: 'interview', title: 'Тренировка собеседований', icon: MessageSquare }
      ]
    },
    {
      id: 'prices',
      title: 'Цены',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      hoverColor: 'from-yellow-500/20 to-orange-500/20',
      activeColor: 'from-yellow-500/30 to-orange-500/30',
      clickable: true
    },
    {
      id: 'companies',
      title: 'Компаниям',
      icon: Building2,
      color: 'from-indigo-500 to-blue-500',
      hoverColor: 'from-indigo-500/20 to-blue-500/20',
      activeColor: 'from-indigo-500/30 to-blue-500/30',
      clickable: true
    },
    {
      id: 'logout',
      title: 'Выход',
      icon: LogOut,
      color: 'from-red-500 to-pink-500',
      hoverColor: 'from-red-500/20 to-red-500/20',
      activeColor: 'from-red-500/30 to-red-500/30',
      clickable: true
    }
  ]

  const handleMenuClick = (menuId: string) => {
    if (menuId === 'logout') {
      onNavigate('logout')
    } else if (menuId === 'profile' || menuId === 'prices' || menuId === 'companies') {
      // Для кликабельных пунктов - переходим напрямую
      onNavigate(menuId)
    }
    // Для 'learn' и 'career' ничего не делаем - только выпадающее меню
  }

  const handleSubmenuClick = (subItemId: string) => {
    // Закрываем подменю после клика
    setHoveredMenu(null)
    
    if (subItemId === 'courses' || subItemId === 'trainers' || subItemId === 'library') {
      onNavigate(subItemId) // Передаем конкретную подстраницу
    } else if (subItemId === 'resume' || subItemId === 'prospects' || subItemId === 'interview') {
      onNavigate(subItemId) // Передаем конкретную подстраницу
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/20 shadow-2xl">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            &lt;BOO!/&gt;
          </div>
          
          <div className="flex items-center space-x-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`relative px-6 py-3 text-white font-medium rounded-xl transition-all duration-300 group overflow-hidden ${
                    currentPage === item.id 
                      ? 'bg-white/30 shadow-lg shadow-white/20 text-white' 
                      : hoveredMenu === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/20'
                  } ${!item.clickable ? 'cursor-default' : 'cursor-pointer'}`}
                  disabled={!item.clickable}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                    {item.submenu && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        hoveredMenu === item.id ? 'rotate-180' : ''
                      }`} />
                    )}
                  </span>
                  
                  {/* Градиентный фон для hover эффекта */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.hoverColor} opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl`}></div>
                  
                  {/* Активный градиент */}
                  {currentPage === item.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.activeColor} rounded-xl`}></div>
                  )}
                  
                  {/* Подсветка при hover */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </button>

                {/* Выпадающее меню */}
                {item.submenu && hoveredMenu === item.id && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-3 w-72 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/50 overflow-hidden shadow-2xl z-[9999]"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Заголовок подменю */}
                      <div className="p-4 bg-gradient-to-r from-white/40 to-white/25 border-b border-white/40">
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                        <p className="text-white text-sm">Выберите раздел</p>
                      </div>
                      
                      {item.submenu.map((subItem, index) => (
                        <button
                          key={subItem.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSubmenuClick(subItem.id)
                          }}
                          className={`w-full p-4 flex items-center space-x-4 hover:bg-white/40 transition-all duration-200 group cursor-pointer ${
                            index !== item.submenu!.length - 1 ? 'border-b border-white/40' : ''
                          }`}
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <subItem.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left flex-1">
                            <div className="text-white font-medium text-base">{subItem.title}</div>
                          </div>
                          <div className="w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-200"></div>
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}