import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KubeTrainer } from './kube-trainer';
import {
  Terminal,
  Info,
  HelpCircle,
  Ship,
  Orbit
} from 'lucide-react';

interface KubeTrainerPageProps {
  onNavigate: (page: string) => void;
  isLoading: boolean;
}

export function KubeTrainerPage({ onNavigate, isLoading }: KubeTrainerPageProps) {
  const [activeTab, setActiveTab] = useState('trainer');

  const tabs = [
    {
      id: 'trainer',
      title: 'Тренажер',
      icon: Terminal,
      description: 'Станьте Командором кластера Kubernetes'
    },
    {
      id: 'help',
      title: 'Справка',
      icon: HelpCircle,
      description: 'Справочник по kubectl и YAML'
    },
    {
      id: 'about',
      title: 'О проекте',
      icon: Info,
      description: 'Информация о KubeQuest'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trainer':
        return <KubeTrainer />;
      case 'help':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-10">
            <div className="max-w-4xl mx-auto p-8">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <HelpCircle className="w-8 h-8 mr-3 text-blue-400" />
                  Краткий справочник по Kubernetes
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">🛸 Основные команды `kubectl`</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">kubectl get pods</code>
                        <p className="text-white/70 text-sm mt-2">Показать все поды</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">kubectl get services</code>
                        <p className="text-white/70 text-sm mt-2">Показать все сервисы</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">kubectl describe pod [name]</code>
                        <p className="text-white/70 text-sm mt-2">Показать детали пода</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <code className="text-green-400 font-mono">kubectl logs [name]</code>
                        <p className="text-white/70 text-sm mt-2">Посмотреть логи пода</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">📄 Структура YAML манифеста</h3>
                     <p className="text-white/70 text-sm mt-2">Каждый манифест должен содержать как минимум:</p>
                     <ul className="list-disc list-inside text-white/70 text-sm mt-2">
                        <li><code className="text-orange-400">apiVersion</code>: Версия API</li>
                        <li><code className="text-orange-400">kind</code>: Тип ресурса (Pod, Deployment, Service)</li>
                        <li><code className="text-orange-400">metadata</code>: Метаданные (имя, лейблы)</li>
                        <li><code className="text-orange-400">spec</code>: Спецификация ресурса</li>
                     </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-10">
            <div className="max-w-4xl mx-auto p-8">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Ship className="w-8 h-8 mr-3 text-blue-400" />
                  О проекте KubeQuest
                </h2>

                <div className="space-y-6 text-white/80">
                  <p className="text-lg">
                    🚀 <strong>KubeQuest</strong> - это интерактивная космическая стратегия, где вы — "Командор кластера".
                  </p>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">🎯 Ваша миссия</h3>
                    <p>
                      Развернуть и поддерживать работоспособность флота (микросервисов) в hostil-среде вселенной Kubernetes.
                      Обучение проходит через решение практических задач в геймифицированной среде.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">🌌 Ключевые концепции</h3>
                    <ul className="space-y-2 ml-4">
                      <li>• <Orbit className="inline w-4 h-4 mr-2"/> Поды (Pods) - ваши корабли</li>
                      <li>• <Orbit className="inline w-4 h-4 mr-2"/> Деплойменты (Deployments) - эскадрильи</li>
                      <li>• <Orbit className="inline w-4 h-4 mr-2"/> Сервисы (Services) - системы связи</li>
                      <li>• <Orbit className="inline w-4 h-4 mr-2"/> Ингрессы (Ingress) - врата гиперпрыжков</li>
                    </ul>
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

      <div className="max-w-7xl mx-auto px-8">
        {renderTabContent()}
      </div>
    </div>
  );
}
