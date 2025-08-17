import React, { useState, useEffect } from 'react';
import { LevelProgress, OverallProgress } from '../../../types/sql-trainer';

interface ProgressTrackerProps {
  userId: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userId }) => {
  const [overallProgress, setOverallProgress] = useState<OverallProgress | null>(null);
  const [levelProgress, setLevelProgress] = useState<LevelProgress[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [userId]);

  const loadProgress = async () => {
    try {
      // Загружаем общий прогресс
      const overallResponse = await fetch(`/api/progress/${userId}/overall`);
      if (overallResponse.ok) {
        const overallData = await overallResponse.json();
        setOverallProgress(overallData);
      }

      // Загружаем прогресс по уровням
      const levelsProgress: LevelProgress[] = [];
      for (let level = 1; level <= 6; level++) {
        const levelResponse = await fetch(`/api/progress/${userId}/level/${level}`);
        if (levelResponse.ok) {
          const levelData = await levelResponse.json();
          levelsProgress.push(levelData);
        }
      }
      setLevelProgress(levelsProgress);
    } catch (error) {
      console.error('Ошибка загрузки прогресса:', error);
    }
  };

  const getDifficultyColor = (level: number) => {
    if (level <= 2) return 'text-green-400';
    if (level <= 4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyText = (level: number) => {
    if (level === 1) return 'Легкий';
    if (level === 2) return 'Простой';
    if (level === 3) return 'Средний';
    if (level === 4) return 'Сложный';
    if (level === 5) return 'Очень сложный';
    return 'Эксперт';
  };

  if (!overallProgress) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="animate-pulse text-center text-green-400">
          Загрузка прогресса...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Общий прогресс */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-300 mb-4">Общий прогресс</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-400">
            {overallProgress.totalCompleted} из {overallProgress.totalTasks} задач
          </span>
          <span className="text-green-300 font-bold">
            {Math.round(overallProgress.overallProgress)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress.overallProgress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-400 mt-2">
          Текущая позиция: Уровень {overallProgress.currentLevel}, Задача {overallProgress.currentTask}
        </div>
      </div>

      {/* Прогресс по уровням */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-300">Прогресс по уровням</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {isExpanded ? 'Свернуть' : 'Развернуть'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levelProgress.map((level) => (
            <div key={level.level} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold ${getDifficultyColor(level.level)}`}>
                  Уровень {level.level}
                </span>
                <span className="text-xs text-gray-400">
                  {getDifficultyText(level.level)}
                </span>
              </div>
              
              <div className="text-sm text-green-400 mb-2">
                {level.completedCount} из {level.totalCount} задач
              </div>
              
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    level.progress === 100 
                      ? 'bg-green-500' 
                      : level.progress >= 50 
                      ? 'bg-yellow-500' 
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${level.progress}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-400 text-center">
                {Math.round(level.progress)}%
              </div>

              {/* Детали уровня при развернутом виде */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-600">
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((taskNum) => {
                      const isCompleted = level.completedCount >= taskNum;
                      return (
                        <div
                          key={taskNum}
                          className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-600 text-gray-400'
                          }`}
                          title={`Задача ${taskNum}`}
                        >
                          {isCompleted ? '✓' : taskNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Достижения */}
      <div className="mt-6 pt-6 border-t border-gray-600">
        <h3 className="text-xl font-semibold text-green-300 mb-4">Достижения</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overallProgress.totalCompleted >= 10 && (
            <div className="flex items-center space-x-3 bg-yellow-900 bg-opacity-30 rounded-lg p-3">
              <div className="text-2xl">🥉</div>
              <div>
                <div className="font-semibold text-yellow-300">Первые шаги</div>
                <div className="text-sm text-yellow-400">Выполнено 10 задач</div>
              </div>
            </div>
          )}
          
          {overallProgress.totalCompleted >= 30 && (
            <div className="flex items-center space-x-3 bg-blue-900 bg-opacity-30 rounded-lg p-3">
              <div className="text-2xl">🥈</div>
              <div>
                <div className="font-semibold text-blue-300">Опытный детектив</div>
                <div className="text-sm text-blue-400">Выполнено 30 задач</div>
              </div>
            </div>
          )}
          
          {overallProgress.totalCompleted >= 50 && (
            <div className="flex items-center space-x-3 bg-purple-900 bg-opacity-30 rounded-lg p-3">
              <div className="text-2xl">🥇</div>
              <div>
                <div className="font-semibold text-purple-300">Мастер SQL</div>
                <div className="text-sm text-purple-400">Выполнено 50 задач</div>
              </div>
            </div>
          )}
          
          {overallProgress.totalCompleted === 60 && (
            <div className="flex items-center space-x-3 bg-green-900 bg-opacity-30 rounded-lg p-3">
              <div className="text-2xl">🏆</div>
              <div>
                <div className="font-semibold text-green-300">Легенда SQL</div>
                <div className="text-sm text-green-400">Все задачи выполнены!</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
