import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  Shield, 
  Database, 
  Network, 
  HardDrive, 
  Server,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Play,
  Pause,
  RotateCcw,
  Download,
  Eye,
  Lock,
  Unlock
} from 'lucide-react';
import { DockerTask, CommandSubmission, CommandResult, DockerProgress } from '@/types/docker-trainer';
import { GradientButton } from './gradient-button';
import { DockerAIHelper } from './docker-ai-helper';

interface DockerTrainerProps {
  userId?: string;
  onNavigate: (page: string) => void;
  isLoading: boolean;
}

export function DockerTrainer({ userId = 'default-user', onNavigate, isLoading }: DockerTrainerProps) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentTask, setCurrentTask] = useState<DockerTask | null>(null);
  const [userCommand, setUserCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandResults, setCommandResults] = useState<CommandResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState<DockerProgress | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [easterEggCount, setEasterEggCount] = useState(0);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const levels = [
    { id: 1, title: "Контейнеры-призраки", description: "Базовые команды Docker", difficulty: "Легко", icon: "👻", color: "from-green-500 to-emerald-500" },
    { id: 2, title: "Вредоносные образы", description: "Работа с образами и слоями", difficulty: "Средне", icon: "🦹", color: "from-blue-500 to-cyan-500" },
    { id: 3, title: "Утечка ресурсов", description: "Управление ресурсами", difficulty: "Средне", icon: "💧", color: "from-purple-500 to-pink-500" },
    { id: 4, title: "Сеть теней", description: "Docker сети", difficulty: "Сложно", icon: "🌐", color: "from-orange-500 to-red-500" },
    { id: 5, title: "Шифрованные volumes", description: "Volumes и данные", difficulty: "Сложно", icon: "🔐", color: "from-indigo-500 to-purple-500" },
    { id: 6, title: "Атака на Swarm", description: "Docker Swarm", difficulty: "Эксперт", icon: "⚔️", color: "from-red-500 to-pink-500" }
  ];

  useEffect(() => {
    loadProgress();
    loadTask(currentLevel);
  }, [currentLevel]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const loadProgress = async () => {
    try {
      const response = await fetch(`/api/docker-trainer/progress/${userId}`);
      if (response.ok) {
        const userProgress = await response.json();
        setProgress(userProgress);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const loadTask = async (level: number) => {
    try {
      const response = await fetch(`/api/docker-trainer/task/${level}`);
      if (response.ok) {
        const task = await response.json();
        setCurrentTask(task);
        setCommandHistory([]);
        setCommandResults([]);
        setTerminalOutput([
          `🚨 ДЕТЕКТИВНОЕ РАССЛЕДОВАНИЕ - УРОВЕНЬ ${level} 🚨`,
          `📖 ${task.title}`,
          '',
          `🔍 СЮЖЕТ:`,
          `${task.story}`,
          '',
          `💡 ЗАДАНИЕ:`,
          `${task.description}`,
          '',
          `💻 Введите Docker команду для решения:`,
          ''
        ]);
      }
    } catch (error) {
      console.error('Error loading task:', error);
    }
  };

  const executeCommand = async () => {
    if (!userCommand.trim() || !currentTask) return;

    setIsExecuting(true);
    setCommandHistory(prev => [...prev, userCommand]);
    
    // Анимация ввода команды
    const commandLine = `$ ${userCommand}`;
    setTerminalOutput(prev => [...prev, commandLine]);
    
    // Симуляция выполнения
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const submission: CommandSubmission = {
        level: currentLevel,
        command: userCommand,
        userId: userId
      };

      const response = await fetch('/api/docker-trainer/check-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        const result: CommandResult = await response.json();
        setCommandResults(prev => [...prev, result]);
        
        // Добавляем результат в терминал
        if (result.isCorrect) {
          setTerminalOutput(prev => [
            ...prev,
            `✅ ${result.feedback}`,
            `🎯 Оценка: ${result.score}/100`,
            result.levelCompleted ? '🎉 Уровень завершен! 🎉' : '',
            ''
          ].filter(Boolean));
          
          if (result.levelCompleted) {
            await loadProgress();
            setTimeout(() => {
              if (currentLevel < 6) {
                setCurrentLevel(prev => prev + 1);
              }
            }, 2000);
          }
        } else {
          setTerminalOutput(prev => [
            ...prev,
            `❌ ${result.feedback}`,
            `💡 Подсказка: ${result.hint}`,
            ''
          ]);
        }
      }
    } catch (error) {
      setTerminalOutput(prev => [
        ...prev,
        `💥 Ошибка выполнения: ${error}`,
        ''
      ]);
    }

    setUserCommand('');
    setIsExecuting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isExecuting) {
      executeCommand();
    }
    
    // Easter Egg: docker run --help
    if (userCommand.includes('docker run --help')) {
      setEasterEggCount(prev => prev + 1);
      if (easterEggCount >= 2) {
        setTerminalOutput(prev => [
          ...prev,
          '🕵️ Секретное сообщение от агента Mulder:',
          '🔍 Истина где-то рядом...',
          '🌌 Docker - это не просто контейнеры, это портал в параллельную вселенную!',
          ''
        ]);
        setEasterEggCount(0);
      }
    }
  };

  const showHintForTask = () => {
    if (currentTask && currentTask.hints.length > 0) {
      const randomHint = currentTask.hints[Math.floor(Math.random() * currentTask.hints.length)];
      setTerminalOutput(prev => [
        ...prev,
        `💡 ПОДСКАЗКА: ${randomHint}`,
        ''
      ]);
    }
  };

  const resetLevel = () => {
    setUserCommand('');
    setCommandHistory([]);
    setCommandResults([]);
    loadTask(currentLevel);
  };

  const downloadProgress = () => {
    if (!progress) return;
    
    const progressText = `Docker Trainer Progress Report
User: ${progress.userId}
Current Level: ${progress.currentLevel}
Total Score: ${progress.totalScore}
Completed Levels: ${progress.completedLevels.join(', ')}
Last Activity: ${new Date(progress.lastActivityTime).toLocaleString()}`;
    
    const element = document.createElement('a');
    const file = new Blob([progressText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `docker_progress_${userId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="text-white text-2xl">Загрузка Docker тренажера...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Заголовок */}
      <div className="text-center pt-32 pb-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          🐳 Docker Detective
        </h1>
        <p className="text-white/70 text-xl">
          Расследуйте тайны контейнеров и станьте мастером Docker!
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Левая панель - Уровни */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Уровни расследования
              </h2>
              
              <div className="space-y-4">
                {levels.map((level) => {
                  const isUnlocked = progress ? progress.completedLevels.includes(level.id - 1) || level.id === 1 : level.id === 1;
                  const isCompleted = progress ? progress.completedLevels.includes(level.id) : false;
                  const score = progress ? progress.levelScores[level.id] || 0 : 0;
                  
                  return (
                    <motion.div
                      key={level.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => isUnlocked && setCurrentLevel(level.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        currentLevel === level.id
                          ? 'border-white/50 bg-white/20'
                          : isUnlocked
                          ? 'border-white/20 hover:bg-white/10'
                          : 'border-white/10 bg-white/5 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{level.icon}</span>
                          <div>
                            <h3 className={`font-semibold ${isUnlocked ? 'text-white' : 'text-white/50'}`}>
                              {level.title}
                            </h3>
                            <p className={`text-sm ${isUnlocked ? 'text-white/70' : 'text-white/30'}`}>
                              {level.description}
                            </p>
                          </div>
                        </div>
                        {isUnlocked ? (
                          isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <Unlock className="w-5 h-5 text-blue-400" />
                          )
                        ) : (
                          <Lock className="w-5 h-5 text-white/30" />
                        )}
                      </div>
                      
                      {isUnlocked && (
                        <div className="flex items-center justify-between text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            level.difficulty === 'Легко' ? 'bg-green-500/20 text-green-400' :
                            level.difficulty === 'Средне' ? 'bg-yellow-500/20 text-yellow-400' :
                            level.difficulty === 'Сложно' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {level.difficulty}
                          </span>
                          {score > 0 && (
                            <span className="text-white/70">Оценка: {score}</span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Прогресс */}
              {progress && (
                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                  <h3 className="text-white font-semibold mb-3">Ваш прогресс</h3>
                  <div className="space-y-2 text-sm text-white/70">
                    <div>Текущий уровень: {progress.currentLevel}</div>
                    <div>Завершено уровней: {progress.completedLevels.length}/6</div>
                    <div>Общий счет: {progress.totalScore}</div>
                  </div>
                  <GradientButton
                    onClick={downloadProgress}
                    className="mt-3 w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Скачать отчет
                  </GradientButton>
                </div>
              )}
            </div>
          </div>

          {/* Основная панель - Терминал */}
          <div className="lg:col-span-3">
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
              {/* Заголовок терминала */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-white font-mono text-sm">
                      docker-detective@investigation:~$
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={showHintForTask}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                      title="Показать подсказку"
                    >
                      <Lightbulb className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={resetLevel}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                      title="Сбросить уровень"
                    >
                      <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Вывод терминала */}
              <div 
                ref={terminalRef}
                className="h-96 overflow-y-auto p-6 font-mono text-sm text-green-400 bg-black"
              >
                {terminalOutput.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
                
                {/* Индикатор ввода */}
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={userCommand}
                    onChange={(e) => setUserCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите Docker команду..."
                    disabled={isExecuting}
                    className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono"
                  />
                  {isExecuting && (
                    <div className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></div>
                  )}
                </div>
              </div>

              {/* История команд */}
              {commandHistory.length > 0 && (
                <div className="bg-gray-900 p-4 border-t border-white/20">
                  <h4 className="text-white font-semibold mb-3">История команд:</h4>
                  <div className="space-y-2">
                    {commandHistory.map((cmd, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-white/50 text-sm">{index + 1}</span>
                        <code className="bg-white/10 px-2 py-1 rounded text-green-400 font-mono text-sm">
                          {cmd}
                        </code>
                        {commandResults[index] && (
                          <span className={`text-sm ${
                            commandResults[index].isCorrect ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {commandResults[index].isCorrect ? '✅' : '❌'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Помощник */}
      <DockerAIHelper currentLevel={currentLevel} currentTask={currentTask?.title || ''} />
    </div>
  );
}
