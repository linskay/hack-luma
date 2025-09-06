import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Plus, X, Download, Brain, Loader2, CheckCircle, AlertCircle 
} from 'lucide-react';
import { 
  Skill, PersonalInfo, ResumeRequest, ResumeResponse, 
  AvailableSkill, AVAILABLE_SKILLS 
} from '../../types/resume';

interface ResumeBuilderProps {
  onClose: () => void;
}

export function ResumeBuilder({ onClose }: ResumeBuilderProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<ResumeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addSkill = (skill: AvailableSkill) => {
    if (!selectedSkills.find(s => s.name === skill.name)) {
      setSelectedSkills([...selectedSkills, {
        name: skill.name,
        level: 70,
        category: skill.category
      }]);
    }
  };

  const removeSkill = (skillName: string) => {
    setSelectedSkills(selectedSkills.filter(s => s.name !== skillName));
  };

  const updateSkillLevel = (skillName: string, level: number) => {
    setSelectedSkills(selectedSkills.map(s => 
      s.name === skillName ? { ...s, level } : s
    ));
  };

  const generateResume = async () => {
    if (!personalInfo.name || !jobTitle) {
      setError('Пожалуйста, заполните имя и должность');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedResume(null);

    try {
      const request: ResumeRequest = {
        personalInfo,
        skills: selectedSkills,
        jobTitle,
        jobUrl: jobUrl.trim() || undefined,
        experience,
        education,
        additionalInfo
      };

      const response = await fetch('/api/resume/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result: ResumeResponse = await response.json();

      if (result.success) {
        setGeneratedResume(result);
      } else {
        setError(result.message || 'Ошибка при генерации резюме');
      }
    } catch (err) {
      setError('Ошибка сети. Попробуйте еще раз.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = () => {
    if (generatedResume?.pdfBase64) {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${generatedResume.pdfBase64}`;
      link.download = `resume_${personalInfo.name.replace(/\s+/g, '_')}.pdf`;
      link.click();
    }
  };

  const skillCategories = Array.from(new Set(AVAILABLE_SKILLS.map(s => s.category)));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Конструктор резюме с ИИ</h2>
              <p className="text-gray-400 text-sm">Создайте профессиональное резюме</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Личная информация</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Местоположение</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Москва"
                />
              </div>
            </div>
          </div>

                     {/* Job Title and URL */}
           <div className="bg-gray-800 rounded-xl p-4">
             <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
               <Briefcase className="w-5 h-5" />
               <span>Желаемая должность</span>
             </h3>
             <div className="space-y-3">
               <input
                 type="text"
                 value={jobTitle}
                 onChange={(e) => setJobTitle(e.target.value)}
                 className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                 placeholder="Frontend Developer"
               />
               <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">
                   Ссылка на вакансию (опционально)
                 </label>
                 <input
                   type="url"
                   value={jobUrl}
                   onChange={(e) => setJobUrl(e.target.value)}
                   className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                   placeholder="https://hh.ru/vacancy/123456"
                 />
                 <p className="text-xs text-gray-400 mt-1">
                   Вставьте ссылку на вакансию для адаптации резюме под конкретную позицию
                 </p>
               </div>
             </div>
           </div>

          {/* Skills Selection */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Навыки</h3>
            
            {/* Selected Skills */}
            {selectedSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Выбранные навыки:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <div key={skill.name} className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-2 flex items-center space-x-2">
                      <span className="text-blue-300 text-sm">{skill.name}</span>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={skill.level}
                        onChange={(e) => updateSkillLevel(skill.name, parseInt(e.target.value))}
                        className="w-16 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-blue-300 text-xs">{skill.level}%</span>
                      <button
                        onClick={() => removeSkill(skill.name)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Skills */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Доступные навыки:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {skillCategories.map((category) => (
                  <div key={category}>
                    <h5 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                      {category}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {AVAILABLE_SKILLS
                        .filter(skill => skill.category === category)
                        .filter(skill => !selectedSkills.find(s => s.name === skill.name))
                        .map((skill) => (
                          <button
                            key={skill.name}
                            onClick={() => addSkill(skill)}
                            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 hover:text-white transition-colors"
                            title={skill.description}
                          >
                            {skill.name}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Опыт работы</h3>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
              placeholder="Опишите ваш опыт работы..."
            />
          </div>

          {/* Education */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Образование</span>
            </h3>
            <textarea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-20 resize-none"
              placeholder="Опишите ваше образование..."
            />
          </div>

          {/* Additional Info */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Дополнительная информация</h3>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-20 resize-none"
              placeholder="Дополнительная информация, достижения, сертификаты..."
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {generatedResume && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">{generatedResume.message}</span>
              </div>
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Скачать PDF</span>
              </button>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={generateResume}
              disabled={isGenerating}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Генерируем резюме...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Сгенерировать резюме с ИИ</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
