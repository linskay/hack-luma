import React, { useState, useEffect } from 'react';
import { Task, TaskResult } from '../../../types/sql-trainer';

interface SQLTrainerProps {
  userId: string;
}

const SQLTrainer: React.FC<SQLTrainerProps> = ({ userId }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentTask, setCurrentTask] = useState(1);
  const [task, setTask] = useState<Task | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [result, setResult] = useState<TaskResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState<any>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);

  useEffect(() => {
    loadTask(currentLevel, currentTask);
    loadProgress();
    loadUnlockedLevels();
  }, [currentLevel, currentTask, userId]);

  const loadTask = async (level: number, taskNumber: number) => {
    try {
      const response = await fetch(`/api/sql-trainer/task/${level}/${taskNumber}`);
      if (response.ok) {
        const taskData = await response.json();
        setTask(taskData);
        setUserQuery('');
        setResult(null);
        setShowHint(false);
      }
    } catch (error) {
      console.error('Ошибка загрузки задачи:', error);
    }
  };

  const loadProgress = async () => {
    try {
      const response = await fetch(`/api/progress/${userId}/overall`);
      if (response.ok) {
        const progressData = await response.json();
        setProgress(progressData);
      }
    } catch (error) {
      console.error('Ошибка загрузки прогресса:', error);
    }
  };

  const loadUnlockedLevels = async () => {
    try {
      const response = await fetch(`/api/progress/${userId}/unlocked-levels`);
      if (response.ok) {
        const levelsData = await response.json();
        setUnlockedLevels(levelsData.unlockedLevels);
      }
    } catch (error) {
      console.error('Ошибка загрузки уровней:', error);
    }
  };

  const submitQuery = async () => {
    if (!userQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/sql-trainer/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userQuery,
          level: currentLevel,
          taskNumber: currentTask,
        }),
      });

      if (response.ok) {
        const resultData = await response.json();
        setResult(resultData);

        if (resultData.isCorrect) {
          // Отмечаем задачу как выполненную
          await fetch(`/api/progress/${userId}/complete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              level: currentLevel,
              taskNumber: currentTask,
            }),
          });

          // Обновляем прогресс
          loadProgress();
        }
      }
    } catch (error) {
      console.error('Ошибка проверки запроса:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHint = async () => {
    try {
      const response = await fetch(`/api/ai-helper/detailed-hint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level: currentLevel,
          taskNumber: currentTask,
          userQuery: userQuery,
        }),
      });

      if (response.ok) {
        const hintData = await response.json();
        setResult(prev => prev ? { ...prev, hint: hintData.hint } : null);
      }
    } catch (error) {
      console.error('Ошибка получения подсказки:', error);
    }
  };

  const nextTask = () => {
    if (currentTask < 10) {
      setCurrentTask(currentTask + 1);
    } else if (currentLevel < 6) {
      setCurrentLevel(currentLevel + 1);
      setCurrentTask(1);
    }
  };

  const prevTask = () => {
    if (currentTask > 1) {
      setCurrentTask(currentTask - 1);
    } else if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
      setCurrentTask(10);
    }
  };

  const selectLevel = (level: number) => {
    if (unlockedLevels.includes(level)) {
      setCurrentLevel(level);
      setCurrentTask(1);
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 p-8">
        <div className="text-center">
          <div className="animate-pulse text-2xl">Сканирование базы данных...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-8">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-green-300">
          SQL Детектив
        </h1>
        <p className="text-green-500">Раскройте тайны города через SQL запросы</p>
      </div>

      {/* Прогресс */}
      {progress && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span>Общий прогресс: {Math.round(progress.overallProgress)}%</span>
            <span>Уровень {progress.currentLevel}, Задача {progress.currentTask}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.overallProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Навигация по уровням */}
      <div className="flex justify-center mb-6 space-x-2">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() => selectLevel(level)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentLevel === level
                ? 'bg-green-600 text-white'
                : unlockedLevels.includes(level)
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!unlockedLevels.includes(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Навигация по задачам */}
      <div className="flex justify-center mb-6 space-x-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((taskNum) => (
          <button
            key={taskNum}
            onClick={() => setCurrentTask(taskNum)}
            className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
              currentTask === taskNum
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {taskNum}
          </button>
        ))}
      </div>

      {/* Основной контент */}
      <div className="max-w-4xl mx-auto">
        {/* Заголовок задачи */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2 text-green-300">
            {task.title}
          </h2>
          <div className="text-sm text-gray-400 mb-2">
            Уровень {task.level} • Задача {task.taskNumber} • {task.difficulty}
          </div>
        </div>

        {/* Сюжет */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-green-300">Сюжет</h3>
          <p className="text-green-400 leading-relaxed">{task.story}</p>
        </div>

        {/* Схема базы данных */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-green-300">Схема базы данных</h3>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-green-300 font-mono">
            {task.schema}
          </pre>
        </div>

        {/* Задание */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-green-300">Задание</h3>
          <p className="text-green-400 leading-relaxed">{task.question}</p>
        </div>

        {/* SQL редактор */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-green-300">Ваш SQL запрос</h3>
          <textarea
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Введите ваш SQL запрос здесь..."
            className="w-full h-32 bg-gray-900 text-green-300 p-4 rounded border border-gray-600 focus:border-green-500 focus:outline-none font-mono text-sm resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              {showHint ? 'Скрыть подсказку' : 'Показать подсказку'}
            </button>
            <button
              onClick={submitQuery}
              disabled={isLoading || !userQuery.trim()}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
            >
              {isLoading ? 'Проверяю...' : 'Проверить запрос'}
            </button>
          </div>
        </div>

        {/* Подсказка */}
        {showHint && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Подсказка</h3>
            <p className="text-blue-400 leading-relaxed">{task.hint}</p>
            <button
              onClick={getHint}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Получить детальную подсказку
            </button>
          </div>
        )}

        {/* Результат */}
        {result && (
          <div className={`bg-gray-800 rounded-lg p-6 mb-6 border-l-4 ${
            result.isCorrect ? 'border-green-500' : 'border-red-500'
          }`}>
            <h3 className={`text-xl font-semibold mb-3 ${
              result.isCorrect ? 'text-green-300' : 'text-red-300'
            }`}>
              {result.isCorrect ? '✅ Запрос выполнен корректно!' : '❌ Ошибка в запросе'}
            </h3>
            <p className={`mb-4 ${
              result.isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {result.message}
            </p>

            {result.hint && !result.isCorrect && (
              <div className="bg-gray-700 rounded p-4 mb-4">
                <h4 className="font-semibold text-yellow-300 mb-2">💡 Подсказка</h4>
                <p className="text-yellow-400">{result.hint}</p>
              </div>
            )}

            {result.errorMessage && (
              <div className="bg-red-900 rounded p-4 mb-4">
                <h4 className="font-semibold text-red-300 mb-2">🚨 Ошибка SQL</h4>
                <p className="text-red-400 font-mono text-sm">{result.errorMessage}</p>
              </div>
            )}

            {/* Результаты запросов */}
            {result.expectedResult && result.actualResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">Ожидаемый результат</h4>
                  <div className="bg-gray-900 rounded p-3 max-h-40 overflow-y-auto">
                    <pre className="text-xs text-green-300">
                      {JSON.stringify(result.expectedResult, null, 2)}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Ваш результат</h4>
                  <div className="bg-gray-900 rounded p-3 max-h-40 overflow-y-auto">
                    <pre className="text-xs text-blue-300">
                      {JSON.stringify(result.actualResult, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Навигация */}
        <div className="flex justify-between">
          <button
            onClick={prevTask}
            disabled={currentLevel === 1 && currentTask === 1}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded transition-colors"
          >
            ← Предыдущая задача
          </button>
          <button
            onClick={nextTask}
            disabled={currentLevel === 6 && currentTask === 10}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded transition-colors"
          >
            Следующая задача →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SQLTrainer;
