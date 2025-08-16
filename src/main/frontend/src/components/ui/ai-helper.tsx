"use client"

import React, { useState, useRef, useEffect } from 'react'
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowUp, Paperclip, Square, X, StopCircle, Mic, Globe, BrainCog, FolderCode, Bot, User, Send, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Utility function for className merging
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ")

// Embedded CSS for minimal custom styles
const styles = `
  *:focus-visible {
    outline-offset: 0 !important;
    --ring-offset: 0 !important;
  }
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #444444;
    border-radius: 3px;
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`

// Inject styles into document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
}

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-transparent hover:scrollbar-thumb-[#555555]",
      className
    )}
    ref={ref}
    rows={1}
    {...props}
  />
))
Textarea.displayName = "Textarea"

// Tooltip Components
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-[#333333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white hover:bg-white/80 text-black",
      outline: "border border-[#444444] bg-transparent hover:bg-[#3A3A40]",
      ghost: "bg-transparent hover:bg-[#3A3A40]",
    }
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6",
      icon: "h-8 w-8 rounded-full aspect-[1/1]",
    }
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Custom Divider Component
const CustomDivider: React.FC = () => (
  <div className="relative h-6 w-[1.5px] mx-1">
    <div
      className="absolute inset-0 bg-gradient-to-t from-transparent via-[#9b87f5]/70 to-transparent rounded-full"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 40%, 140% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 60%, -40% 50%, 0% 40%)",
      }}
    />
  </div>
)

// Message Component
interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          {message.isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        <div className={`rounded-2xl px-4 py-3 ${
          message.isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
          <p className={`text-xs mt-2 ${
            message.isUser ? 'text-white/70' : 'text-white/50'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Main AI Helper Component
export function AIHelper() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Привет! Я ваш ИИ помощник. Чем могу помочь?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showThink, setShowThink] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isConnected, setIsConnected] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [input])

  // Автоматически проверяем статус AI сервисов при открытии чата
  useEffect(() => {
    if (isOpen) {
      checkAIStatus()
    }
  }, [isOpen])

  const getRandomTip = async () => {
    try {
      const response = await fetch('/api/ai/tip')
      if (response.ok) {
        const data = await response.json()
        const tipMessage: Message = {
          id: Date.now().toString(),
          content: data.tip || 'Получите совет по программированию!',
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, tipMessage])
      }
    } catch (error) {
      console.error('Ошибка при получении совета:', error)
    }
  }

  const checkAIStatus = async () => {
    try {
      const response = await fetch('/api/ai/status')
      if (response.ok) {
        const data = await response.json()
        let statusText = '📊 Статус AI сервисов:\n'
        
        if (data.gemini) {
          statusText += `🤖 Gemini: ${data.gemini === 'available' ? '✅ Доступен' : '❌ Недоступен'}\n`
        }
        if (data.djl) {
          statusText += `🧠 DJL: ${data.djl === 'available' ? '✅ Доступен' : '❌ Недоступен'}\n`
        }
        
        // Устанавливаем состояние подключения
        setIsConnected(true)
        
        const statusMessage: Message = {
          id: Date.now().toString(),
          content: statusText,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, statusMessage])
      } else {
        setIsConnected(false)
      }
    } catch (error) {
      console.error('Ошибка при проверке статуса:', error)
      setIsConnected(false)
    }
  }

  const handleToggleChange = (value: string) => {
    if (value === "search") {
      setShowSearch((prev) => !prev)
      setShowThink(false)
      setShowCanvas(false)
    } else if (value === "think") {
      setShowThink((prev) => !prev)
      setShowSearch(false)
      setShowCanvas(false)
    } else if (value === "canvas") {
      setShowCanvas((prev) => !prev)
      setShowSearch(false)
      setShowThink(false)
    }
  }

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Вызываем реальный API бэкенда
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input })
      })

      if (response.ok) {
        const data = await response.json()
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || 'Извините, не удалось получить ответ от AI.',
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        // В случае ошибки показываем сообщение об ошибке
        let errorMessage = 'Извините, произошла ошибка при получении ответа от AI.'
        
        if (response.status === 404) {
          errorMessage = 'AI сервис недоступен. Убедитесь, что бэкенд запущен.'
        } else if (response.status === 500) {
          errorMessage = 'Внутренняя ошибка сервера. Попробуйте позже.'
        } else if (response.status === 503) {
          errorMessage = 'AI сервис временно недоступен. Попробуйте позже.'
        }
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: errorMessage,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      console.error('Ошибка при обращении к AI API:', error)
      
      let errorMessage = 'Извините, не удалось подключиться к AI сервису.'
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен на порту 8080.'
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Сервер недоступен. Проверьте, что Spring Boot приложение запущено.'
      } else {
        errorMessage = `Ошибка подключения: ${error instanceof Error ? error.message : String(error)}`
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const hasContent = input.trim() !== ""

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        <Bot className="w-6 h-6 text-white" />
      </motion.button>

      {/* AI Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1F2023] rounded-2xl border border-[#444444] shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#444444] bg-[#2A2B2E]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">ИИ Помощник</h3>
                    <p className="text-white/60 text-xs flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {isConnected ? 'Подключен' : 'Не подключен'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={getRandomTip}
                    className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    title="Получить совет"
                  >
                    <BrainCog className="w-4 h-4" />
                  </button>
                  <button
                    onClick={checkAIStatus}
                    className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    title="Проверить статус"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsConnected(false)
                      checkAIStatus()
                    }}
                    className={`p-2 transition-colors rounded-lg hover:bg-white/10 ${
                      isConnected ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'
                    }`}
                    title="Переподключиться"
                  >
                    <div className={`w-4 h-4 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#444444] bg-[#2A2B2E]">
                <TooltipProvider>
                  <div className="rounded-2xl border border-[#444444] bg-[#1F2023] p-3 shadow-lg">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <Textarea
                          ref={textareaRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={
                            showSearch
                              ? "Поиск в интернете..."
                              : showThink
                              ? "Глубокое размышление..."
                              : showCanvas
                              ? "Создание на холсте..."
                              : "Напишите сообщение..."
                          }
                          className="text-sm"
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleToggleChange("search")}
                            className={cn(
                              "rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8",
                              showSearch
                                ? "bg-[#1EAEDB]/15 border-[#1EAEDB] text-[#1EAEDB]"
                                : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
                            )}
                          >
                            <Globe className="w-4 h-4" />
                          </button>

                          <CustomDivider />

                          <button
                            type="button"
                            onClick={() => handleToggleChange("think")}
                            className={cn(
                              "rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8",
                              showThink
                                ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-[#8B5CF6]"
                                : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
                            )}
                          >
                            <BrainCog className="w-4 h-4" />
                          </button>

                          <CustomDivider />

                          <button
                            type="button"
                            onClick={() => handleToggleChange("canvas")}
                            className={cn(
                              "rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8",
                              showCanvas
                                ? "bg-[#F97316]/15 border-[#F97316] text-[#F97316]"
                                : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
                            )}
                          >
                            <FolderCode className="w-4 h-4" />
                          </button>
                        </div>

                        <Button
                          variant="default"
                          size="icon"
                          className={cn(
                            "h-8 w-8 rounded-full transition-all duration-200",
                            hasContent
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                              : "bg-transparent hover:bg-gray-600/30 text-[#9CA3AF] hover:text-[#D1D5DB]"
                          )}
                          onClick={handleSubmit}
                          disabled={isLoading || !hasContent}
                        >
                          {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TooltipProvider>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
