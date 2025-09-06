import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, Loader, CheckCircle, AlertTriangle, Ship, Lightbulb } from 'lucide-react';
import { KubeSubmission, KubeResult, KubeTask } from '@/types/kubetrainer';
import { GradientButton } from './gradient-button';


export function KubeTrainer() {
  const [currentTask, setCurrentTask] = useState<KubeTask | null>(null);
  const [yamlInput, setYamlInput] = useState('');
  const [result, setResult] = useState<KubeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      setIsTaskLoading(true);
      try {
        const response = await fetch('/api/kubetrainer/task/1'); // Fetching level 1 task
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const taskData: KubeTask = await response.json();
        setCurrentTask(taskData);
      } catch (error) {
        console.error("Error fetching task:", error);
        // Handle error state if needed
      } finally {
        setIsTaskLoading(false);
      }
    };

    fetchTask();
  }, []);

  const handleSubmit = async () => {
    if (!currentTask) return;
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

  const handleGetHint = async () => {
    if (!currentTask) return;
    if (!yamlInput.trim()) {
      setResult({
        success: false,
        message: "Напишите что-нибудь в редакторе, чтобы получить подсказку.",
        taskCompleted: false,
      });
      return;
    }

    setIsHintLoading(true);
    setResult(null);

    try {
        const submission: KubeSubmission = {
            taskId: currentTask.id,
            yaml: yamlInput,
        };

        const response = await fetch('/api/kubetrainer/hint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
        });

        const hintText = await response.text();
        setResult({
            success: false,
            message: "Получена подсказка от AI-помощника:",
            hint: hintText,
            taskCompleted: false,
        });

    } catch (error) {
        setResult({
            success: false,
            message: 'Не удалось получить подсказку от AI.',
            details: error instanceof Error ? error.message : 'Unknown error',
            taskCompleted: false,
        });
    } finally {
        setIsHintLoading(false);
    }
  };

  if (isTaskLoading) {
    return <div className="text-white text-center p-8">Загрузка миссии...</div>;
  }

  if (!currentTask) {
    return <div className="text-red-500 text-center p-8">Не удалось загрузить миссию. Попробуйте обновить страницу.</div>;
  }

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
          disabled={isLoading || isHintLoading}
          className="w-full h-64 p-4 font-mono text-sm bg-black text-green-400 border-none outline-none resize-none"
        />

        <div className="p-4 bg-gray-900 border-t border-white/20 flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-grow">
                <GradientButton onClick={handleSubmit} disabled={isLoading || isHintLoading} className="w-full">
                    {isLoading ? (
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5 mr-2" />
                    )}
                    <span>{isLoading ? 'Применяем...' : 'Применить манифест'}</span>
                </GradientButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <button onClick={handleGetHint} disabled={isLoading || isHintLoading} title="Получить подсказку" className="p-3 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-lg transition-colors border border-yellow-500/50">
                    {isHintLoading ? <Loader className="w-5 h-5 text-yellow-300 animate-spin"/> : <Lightbulb className="w-5 h-5 text-yellow-300"/>}
                 </button>
            </motion.div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 border-t border-white/20 overflow-hidden"
            >
              <div className={`p-4 rounded-lg flex items-start space-x-3 ${result.success && result.taskCompleted ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {result.success && result.taskCompleted ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0"/>
                      </motion.div>
                  ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0"/>
                  )}
                  <div className="flex-grow">
                      <h4 className={`font-bold ${result.success && result.taskCompleted ? 'text-white' : 'text-red-300'}`}>{result.message}</h4>
                      {result.details && (
                          <p className="text-xs text-white/70 mt-2 font-mono whitespace-pre-wrap">{result.details}</p>
                      )}
                      {result.hint && (
                           <p className="text-xs text-yellow-400/80 mt-2 font-mono whitespace-pre-wrap">💡 {result.hint}</p>
                      )}
                  </div>
                  {result.success && result.taskCompleted && (
                    <motion.div
                      initial={{ x: 50, opacity: 0, rotate: 15 }}
                      animate={{ x: 0, opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Ship className="w-8 h-8 text-blue-300/70" />
                    </motion.div>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
