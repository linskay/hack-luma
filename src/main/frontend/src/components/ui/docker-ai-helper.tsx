import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, X, Send, Sparkles, Terminal, BookOpen, Lightbulb } from 'lucide-react';

interface DockerAIHelperProps {
  currentLevel?: number;
  currentTask?: string;
}

export function DockerAIHelper({ currentLevel = 1, currentTask = '' }: DockerAIHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai', content: string }>>([
    {
      type: 'ai',
      content: 'Привет! Я ваш AI помощник по Docker. Готов помочь с любыми вопросами по контейнеризации! 🐳'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const dockerTips = {
    1: [
      '💡 **Уровень 1 - Базовые команды:**',
      '• `docker ps` - показать запущенные контейнеры',
      '• `docker ps -a` - показать все контейнеры (включая остановленные)',
      '• `docker logs` - просмотр логов контейнера',
      '• `docker inspect` - детальная информация о контейнере',
      '',
      '🔍 **Совет:** Используйте флаги для фильтрации, например `--filter "since=24h"` для поиска по времени'
    ],
    2: [
      '💡 **Уровень 2 - Образы и слои:**',
      '• `docker images` - список всех образов',
      '• `docker history` - история слоев образа',
      '• `docker diff` - изменения в файловой системе',
      '• `docker inspect` - детали образа',
      '',
      '🔍 **Совет:** Каждый слой в `docker history` показывает команду и размер. Ищите подозрительные изменения!'
    ],
    3: [
      '💡 **Уровень 3 - Управление ресурсами:**',
      '• `docker exec` - выполнение команд в контейнере',
      '• `docker stats` - мониторинг ресурсов',
      '• `docker run --memory` - ограничение памяти',
      '• `docker run --cpus` - ограничение CPU',
      '',
      '🔍 **Совет:** Флаг `-it` обеспечивает интерактивный режим для `docker exec`'
    ],
    4: [
      '💡 **Уровень 4 - Docker сети:**',
      '• `docker network ls` - список сетей',
      '• `docker network inspect` - детали сети',
      '• `docker network prune` - очистка неиспользуемых сетей',
      '• `docker network connect` - подключение контейнера к сети',
      '',
      '🔍 **Совет:** Используйте `--dry-run` для безопасной проверки что будет удалено'
    ],
    5: [
      '💡 **Уровень 5 - Volumes и данные:**',
      '• `docker volume ls` - список volumes',
      '• `docker volume inspect` - детали volume',
      '• `docker inspect -f "{{ .Mounts }}"` - подключения контейнера',
      '• `docker run -v` - монтирование volume',
      '',
      '🔍 **Совет:** Go template `{{ .Mounts }}` покажет все подключенные volumes и bind mounts'
    ],
    6: [
      '💡 **Уровень 6 - Docker Swarm:**',
      '• `docker service ls` - список служб',
      '• `docker stack ls` - список стеков',
      '• `docker node ls` - список нод',
      '• `docker service inspect` - детали службы',
      '',
      '🔍 **Совет:** Фильтры в Swarm командах работают аналогично обычным Docker командам'
    ]
  };

  const quickCommands = [
    'docker ps -a',
    'docker logs --tail 100',
    'docker exec -it container_name bash',
    'docker inspect container_name',
    'docker network ls',
    'docker volume ls',
    'docker system df',
    'docker stats'
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsTyping(true);

    // Симулируем ответ AI
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMessage(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Проверяем ключевые слова и даем соответствующие советы
    if (message.includes('ps') || message.includes('контейнер')) {
      return `🔍 **Docker PS команды:**
• \`docker ps\` - только запущенные контейнеры
• \`docker ps -a\` - все контейнеры
• \`docker ps --filter "status=exited"\` - только остановленные
• \`docker ps --format "table {{.ID}}\\t{{.Names}}\\t{{.Status}}"\` - кастомный формат

💡 **Полезные фильтры:**
• \`--filter "name=web*"\` - по имени
• \`--filter "label=environment=prod"\` - по меткам
• \`--filter "since=24h"\` - по времени создания`;
    }
    
    if (message.includes('logs') || message.includes('логи')) {
      return `📋 **Docker Logs команды:**
• \`docker logs container_name\` - все логи
• \`docker logs --tail 100 container_name\` - последние 100 строк
• \`docker logs -f container_name\` - следить за логами в реальном времени
• \`docker logs --since "2024-01-01T00:00:00" container_name\` - логи с определенного времени

💡 **Флаги:**
• \`--tail N\` - последние N строк
• \`-f\` или \`--follow\` - следить за новыми логами
• \`--since\` - логи с определенного времени
• \`--until\` - логи до определенного времени`;
    }
    
    if (message.includes('exec') || message.includes('выполнить')) {
      return `⚡ **Docker Exec команды:**
• \`docker exec -it container_name bash\` - интерактивная bash сессия
• \`docker exec container_name ls -la /\` - выполнить команду и выйти
• \`docker exec -u root container_name whoami\` - выполнить от имени root
• \`docker exec -w /app container_name pwd\` - указать рабочую директорию

💡 **Важные флаги:**
• \`-i\` - интерактивный режим (stdin)
• \`-t\` - выделить TTY
• \`-u\` - указать пользователя
• \`-w\` - рабочая директория`;
    }
    
    if (message.includes('network') || message.includes('сеть')) {
      return `🌐 **Docker Network команды:**
• \`docker network ls\` - список всех сетей
• \`docker network inspect network_name\` - детали сети
• \`docker network create my_network\` - создать сеть
• \`docker network prune\` - удалить неиспользуемые сети
• \`docker network connect network_name container_name\` - подключить контейнер

💡 **Типы сетей:**
• \`bridge\` - стандартная сеть (по умолчанию)
• \`host\` - использовать сеть хоста
• \`none\` - без сетевого доступа
• \`overlay\` - для Swarm кластеров`;
    }
    
    if (message.includes('volume') || message.includes('данные')) {
      return `💾 **Docker Volume команды:**
• \`docker volume ls\` - список volumes
• \`docker volume create my_volume\` - создать volume
• \`docker volume inspect volume_name\` - детали volume
• \`docker volume prune\` - удалить неиспользуемые volumes
• \`docker run -v my_volume:/app/data image\` - монтировать volume

💡 **Монтирование:**
• \`-v volume_name:/path\` - именованный volume
• \`-v /host/path:/container/path\` - bind mount
• \`-v /host/path:/container/path:ro\` - только для чтения`;
    }
    
    if (message.includes('swarm') || message.includes('кластер')) {
      return `⚔️ **Docker Swarm команды:**
• \`docker swarm init\` - инициализировать Swarm
• \`docker service create --name web nginx\` - создать службу
• \`docker service ls\` - список служб
• \`docker stack deploy -c docker-compose.yml my_stack\` - развернуть стек
• \`docker node ls\` - список нод

💡 **Управление службами:**
• \`docker service scale web=3\` - масштабировать до 3 реплик
• \`docker service update --image nginx:latest web\` - обновить образ
• \`docker service logs web\` - логи службы`;
    }
    
    if (message.includes('помощь') || message.includes('help') || message.includes('совет')) {
      return `🎯 **Общие советы по Docker:**
• Используйте \`--help\` для получения справки по любой команде
• Команды чувствительны к регистру
• Используйте tab для автодополнения имен контейнеров и образов
• Комбинируйте команды с pipe (|) для сложных операций
• Используйте метки (labels) для организации контейнеров

🔍 **Полезные команды:**
• \`docker system df\` - использование диска
• \`docker system prune\` - очистка системы
• \`docker stats\` - мониторинг ресурсов в реальном времени
• \`docker top container_name\` - процессы в контейнере`;
    }
    
    // Общий ответ
    return `🤖 **Я понимаю ваш вопрос!** 

Попробуйте задать более конкретный вопрос о Docker командах. Например:
• "Как посмотреть логи контейнера?"
• "Как выполнить команду в контейнере?"
• "Как работать с Docker сетями?"
• "Как управлять volumes?"

Или используйте быстрые команды справа для изучения основных возможностей Docker! 🐳`;
  };

  const handleQuickCommand = (command: string) => {
    setInputMessage(command);
    // Автоматически отправляем команду как вопрос
    setTimeout(() => {
      const aiResponse = generateAIResponse(command);
      setMessages(prev => [...prev, { type: 'user', content: command }, { type: 'ai', content: aiResponse }]);
    }, 100);
  };

  const toggleAIHelper = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Кнопка открытия AI помощника */}
      <motion.button
        onClick={toggleAIHelper}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 z-[9999] flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="w-8 h-8 text-white" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </motion.button>

      {/* AI помощник */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-[9998] overflow-hidden"
          >
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Docker AI Помощник</h3>
                    <p className="text-white/70 text-sm">Уровень {currentLevel}</p>
                  </div>
                </div>
                <button
                  onClick={toggleAIHelper}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Советы по текущему уровню */}
            <div className="p-4 bg-white/5 border-b border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Советы для уровня {currentLevel}</span>
              </div>
              <div className="text-white/80 text-sm space-y-1">
                {dockerTips[currentLevel as keyof typeof dockerTips]?.slice(0, 4).map((tip, index) => (
                  <div key={index}>{tip}</div>
                ))}
              </div>
            </div>

            {/* Быстрые команды */}
            <div className="p-4 bg-white/5 border-b border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Быстрые команды</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickCommands.map((command, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickCommand(command)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 text-xs font-mono transition-colors"
                  >
                    {command}
                  </button>
                ))}
              </div>
            </div>

            {/* Чат */}
            <div className="flex-1 p-4 overflow-y-auto max-h-64">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white/90'
                      }`}
                    >
                      <div className="whitespace-pre-line text-sm">{message.content}</div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 text-white/90 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Ввод сообщения */}
            <div className="p-4 border-t border-white/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос о Docker..."
                  className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-lg px-3 py-2 text-sm outline-none border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  autoFocus={isOpen}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-white/20 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
