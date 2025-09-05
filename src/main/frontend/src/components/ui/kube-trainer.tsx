import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { KubeSubmission, KubeResult, KubeTask } from '@/types/kubetrainer'; // Assuming types are defined
import { GradientButton } from './gradient-button';

// Placeholder types until they are globally defined
interface KubeTask {
  id: number;
  title: string;
  story: string;
  description: string;
}

interface KubeSubmission {
  taskId: number;
  yaml: string;
}

interface KubeResult {
  success: boolean;
  message: string;
  details?: string;
  hint?: string;
  taskCompleted: boolean;
}


export function KubeTrainer() {
  const [yamlInput, setYamlInput] = useState('');
  const [result, setResult] = useState<KubeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded task for now
  const currentTask: KubeTask = {
    id: 1,
    title: "Миссия 1: Запуск разведчика",
    story: "Командор, наш флот прибыл в новую систему. Нам нужно быстро оценить обстановку. Запустите один разведывательный корабль (Pod), чтобы собрать данные. Он должен быть оснащен стандартным сенсорным пакетом 'nginx'.",
    description: "Создайте Pod с именем 'recon-pod' и образом 'nginx:latest'."
  };

  const handleSubmit = async () => {
    if (!yamlInput.trim()) {
      setResult({
        success: false,
        message: "YAML манифест не может быть пустым.",
        taskCompleted: false,
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const submission: KubeSubmission = {
        taskId: currentTask.id,
        yaml: yamlInput,
      };

      const response = await fetch('/api/kubetrainer/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      const data: KubeResult = await response.json();
      setResult(data);

    } catch (error) {
      setResult({
        success: false,
        message: 'Произошла сетевая ошибка или ошибка сервера.',
        details: error instanceof Error ? error.message : 'Unknown error',
        taskCompleted: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Panel: Task Description */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">{currentTask.title}</h2>
        <p className="text-white/70 mb-4 italic">{currentTask.story}</p>
        <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Техническое задание:</h3>
            <p className="text-blue-300 font-mono">{currentTask.description}</p>
        </div>
      </div>

      {/* Right Panel: YAML Editor and Result */}
      <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <Terminal className="w-5 h-5 text-blue-300"/>
                <span className="text-white font-mono text-sm">YAML Манифест</span>
            </div>
        </div>

        <textarea
          value={yamlInput}
          onChange={(e) => setYamlInput(e.target.value)}
          placeholder={`apiVersion: v1\nkind: Pod\nmetadata:\n  name: recon-pod\nspec:\n  containers:\n  - name: nginx-container\n    image: nginx:latest`}
          disabled={isLoading}
          className="w-full h-64 p-4 font-mono text-sm bg-black text-green-400 border-none outline-none resize-none"
        />

        <div className="p-4 bg-gray-900 border-t border-white/20">
            <GradientButton onClick={handleSubmit} disabled={isLoading} className="w-full">
                {isLoading ? (
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                    <Send className="w-5 h-5 mr-2" />
                )}
                <span>{isLoading ? 'Применяем...' : 'Применить манифест'}</span>
            </GradientButton>
        </div>

        {result && (
          <div className="p-4 border-t border-white/20">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg flex items-start space-x-3 ${result.success ? 'bg-green-500/20' : 'bg-red-500/20'}`}
            >
                {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0"/>
                ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0"/>
                )}
                <div>
                    <h4 className={`font-bold ${result.success ? 'text-white' : 'text-red-300'}`}>{result.message}</h4>
                    {result.details && (
                        <p className="text-xs text-white/70 mt-2 font-mono whitespace-pre-wrap">{result.details}</p>
                    )}
                    {result.hint && (
                         <p className="text-xs text-yellow-400/80 mt-2">💡 Подсказка: {result.hint}</p>
                    )}
                </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
