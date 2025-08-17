import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DockerTrainer } from './docker-trainer';
import { 
  BookOpen, 
  Terminal, 
  Info,
  HelpCircle
} from 'lucide-react';

interface DockerTrainerPageProps {
  onNavigate: (page: string) => void;
  isLoading: boolean;
}

export function DockerTrainerPage({ onNavigate, isLoading }: DockerTrainerPageProps) {
  const [activeTab, setActiveTab] = useState('trainer');

  const tabs = [
    {
      id: 'trainer',
      title: 'Тренажер',
      icon: Terminal,
      description: 'Изучайте Docker команды в детективном стиле'
    },
    {
      id: 'help',
      title: 'Помощь',
      icon: HelpCircle,
      description: 'Справочник по Docker командам'
    },
    {
      id: 'about',
      title: 'О проекте',
      icon: Info,
      description: 'Информация о тренажере'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trainer':
        return <DockerTrainer onNavigate={onNavigate} isLoading={isLoading} />;
      case 'help':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32">
            <div className="max-w-4xl mx-auto p-8">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="w-8 h-8 mr-3 text-blue-400" />
                  Справочник Docker команд
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">🐳 Базовые команды</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker ps</code>
                        <p className="text-white/70 text-sm mt-2">Показать запущенные контейнеры</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker ps -a</code>
                        <p className="text-white/70 text-sm mt-2">Показать все контейнеры</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker logs</code>
                        <p className="text-white/70 text-sm mt-2">Просмотр логов контейнера</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker exec</code>
                        <p className="text-white/70 text-sm mt-2">Выполнение команд в контейнере</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">🔍 Инспекция и анализ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker inspect</code>
                        <p className="text-white/70 text-sm mt-2">Детальная информация о контейнере</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker history</code>
                        <p className="text-white/70 text-sm mt-2">История слоев образа</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker diff</code>
                        <p className="text-white/70 text-sm mt-2">Изменения в файловой системе</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker stats</code>
                        <p className="text-white/70 text-sm mt-2">Мониторинг ресурсов</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">🌐 Сети и Volumes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker network ls</code>
                        <p className="text-white/70 text-sm mt-2">Список сетей</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker volume ls</code>
                        <p className="text-white/70 text-sm mt-2">Список volumes</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker network inspect</code>
                        <p className="text-white/70 text-sm mt-2">Детали сети</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">docker volume inspect</code>
                        <p className="text-white/70 text-sm mt-2">Детали volume</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-32">
            <div className="max-w-4xl mx-auto p-8">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Info className="w-8 h-8 mr-3 text-blue-400" />
                  О проекте Docker Detective
                </h2>
                
                <div className="space-y-6 text-white/80">
                  <p className="text-lg">
                    🐳 <strong>Docker Detective</strong> - это интерактивный тренажер для изучения Docker команд в стиле детективной игры.
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">🎯 Концепция</h3>
                    <p>
                      Вы - инженер-криминалист, расследующий инциденты в подозрительных контейнерах. 
                      Каждый уровень - это новое расследование, где нужно использовать Docker команды для решения задач.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">📚 Уровни сложности</h3>
                    <ul className="space-y-2 ml-4">
                      <li>• <strong>Уровень 1:</strong> Базовые команды (ps, logs, inspect)</li>
                      <li>• <strong>Уровень 2:</strong> Образы и слои (images, history, diff)</li>
                      <li>• <strong>Уровень 3:</strong> Управление ресурсами (exec, stats, run)</li>
                      <li>• <strong>Уровень 4:</strong> Docker сети (network ls, inspect, prune)</li>
                      <li>• <strong>Уровень 5:</strong> Volumes и данные (volume ls, inspect, mounts)</li>
                      <li>• <strong>Уровень 6:</strong> Docker Swarm (service, stack, node)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">🚀 Особенности</h3>
                    <ul className="space-y-2 ml-4">
                      <li>• 🎮 Интерактивный терминал с анимацией</li>
                      <li>• 🤖 AI помощник с контекстными советами</li>
                      <li>• 📊 Отслеживание прогресса и оценок</li>
                      <li>• 🎯 Конкретные подсказки при ошибках</li>
                      <li>• 🕵️ Детективный сюжет для каждой задачи</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
                    <p className="text-blue-300">
                      💡 <strong>Совет:</strong> Используйте AI помощника (кнопка с ботом в правом нижнем углу) 
                      для получения подсказок и изучения Docker команд!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Навигация по вкладкам */}
      <div className="max-w-7xl mx-auto px-8 pt-32 mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-white/50 bg-white/20 text-white'
                    : 'border-white/20 hover:bg-white/10 text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Содержимое вкладок */}
      <div className="max-w-7xl mx-auto px-8">
        {renderTabContent()}
      </div>
    </div>
  );
}
