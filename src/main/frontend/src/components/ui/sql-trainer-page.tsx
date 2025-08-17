import React, { useState } from 'react';
import SQLTrainer from './sql-trainer';
import ProgressTracker from './progress-tracker';

interface SQLTrainerPageProps {
  userId?: string;
  onNavigate: (page: string) => void;
  isLoading: boolean;
}

type TabType = 'trainer' | 'progress';

const SQLTrainerPage: React.FC<SQLTrainerPageProps> = ({ userId = 'default-user', onNavigate, isLoading }) => {
  const [activeTab, setActiveTab] = useState<TabType>('trainer');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Навигация по вкладкам */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('trainer')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'trainer'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              🕵️ SQL Тренажер
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'progress'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              📊 Прогресс
            </button>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'trainer' ? (
          <SQLTrainer userId={userId} />
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 text-green-300">
                Ваш прогресс
              </h1>
              <p className="text-green-500">
                Отслеживайте свои достижения в SQL тренажере
              </p>
            </div>
            <ProgressTracker userId={userId} />
          </div>
        )}
      </div>

      {/* Информационная панель */}
      <div className="fixed bottom-4 right-4 bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-600 max-w-sm">
        <h4 className="text-green-300 font-semibold mb-2">💡 Советы</h4>
        <div className="text-sm text-green-400 space-y-2">
          {activeTab === 'trainer' ? (
            <>
              <p>• Используйте подсказки, если застряли</p>
              <p>• Проверяйте синтаксис SQL</p>
              <p>• Обращайте внимание на структуру таблиц</p>
            </>
          ) : (
            <>
              <p>• Выполняйте задачи последовательно</p>
              <p>• Открывайте новые уровни</p>
              <p>• Следите за достижениями</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SQLTrainerPage;
