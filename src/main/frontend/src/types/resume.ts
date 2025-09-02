export interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface ResumeRequest {
  personalInfo: PersonalInfo;
  skills: Skill[];
  jobTitle: string;
  jobUrl?: string; // Ссылка на вакансию (опционально)
  experience: string;
  education: string;
  additionalInfo: string;
}

export interface ResumeResponse {
  pdfBase64: string;
  message: string;
  success: boolean;
}

export interface AvailableSkill {
  name: string;
  category: string;
  description: string;
}

export const AVAILABLE_SKILLS: AvailableSkill[] = [
  // Frontend
  { name: 'HTML', category: 'Frontend', description: 'Язык разметки для веб-страниц' },
  { name: 'CSS', category: 'Frontend', description: 'Стилизация веб-страниц' },
  { name: 'JavaScript', category: 'Frontend', description: 'Язык программирования для веб-разработки' },
  { name: 'TypeScript', category: 'Frontend', description: 'Типизированный JavaScript' },
  { name: 'React', category: 'Frontend', description: 'JavaScript библиотека для UI' },
  { name: 'Vue.js', category: 'Frontend', description: 'Прогрессивный JavaScript фреймворк' },
  { name: 'Angular', category: 'Frontend', description: 'Платформа для веб-приложений' },
  { name: 'Svelte', category: 'Frontend', description: 'Компилируемый веб-фреймворк' },
  
  // Backend
  { name: 'Java', category: 'Backend', description: 'Объектно-ориентированный язык программирования' },
  { name: 'Spring Boot', category: 'Backend', description: 'Фреймворк для Java приложений' },
  { name: 'Python', category: 'Backend', description: 'Высокоуровневый язык программирования' },
  { name: 'Django', category: 'Backend', description: 'Веб-фреймворк для Python' },
  { name: 'Flask', category: 'Backend', description: 'Микрофреймворк для Python' },
  { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime для серверной разработки' },
  { name: 'Express.js', category: 'Backend', description: 'Веб-фреймворк для Node.js' },
  { name: 'C#', category: 'Backend', description: 'Язык программирования от Microsoft' },
  { name: '.NET', category: 'Backend', description: 'Платформа разработки от Microsoft' },
  { name: 'Go', category: 'Backend', description: 'Язык программирования от Google' },
  { name: 'Rust', category: 'Backend', description: 'Системный язык программирования' },
  
  // Database
  { name: 'SQL', category: 'Database', description: 'Язык запросов к базам данных' },
  { name: 'PostgreSQL', category: 'Database', description: 'Объектно-реляционная СУБД' },
  { name: 'MySQL', category: 'Database', description: 'Реляционная СУБД' },
  { name: 'MongoDB', category: 'Database', description: 'NoSQL документо-ориентированная СУБД' },
  { name: 'Redis', category: 'Database', description: 'In-memory структура данных' },
  { name: 'Oracle', category: 'Database', description: 'Корпоративная СУБД' },
  
  // DevOps
  { name: 'Docker', category: 'DevOps', description: 'Платформа контейнеризации' },
  { name: 'Kubernetes', category: 'DevOps', description: 'Оркестратор контейнеров' },
  { name: 'Jenkins', category: 'DevOps', description: 'Сервер автоматизации' },
  { name: 'GitLab CI', category: 'DevOps', description: 'CI/CD платформа' },
  { name: 'GitHub Actions', category: 'DevOps', description: 'CI/CD в GitHub' },
  { name: 'Terraform', category: 'DevOps', description: 'Infrastructure as Code' },
  { name: 'Ansible', category: 'DevOps', description: 'Автоматизация конфигурации' },
  { name: 'AWS', category: 'DevOps', description: 'Облачная платформа Amazon' },
  { name: 'Azure', category: 'DevOps', description: 'Облачная платформа Microsoft' },
  { name: 'Google Cloud', category: 'DevOps', description: 'Облачная платформа Google' },
  
  // Mobile
  { name: 'React Native', category: 'Mobile', description: 'Кроссплатформенная мобильная разработка' },
  { name: 'Flutter', category: 'Mobile', description: 'UI фреймворк от Google' },
  { name: 'Swift', category: 'Mobile', description: 'Язык для iOS разработки' },
  { name: 'Kotlin', category: 'Mobile', description: 'Язык для Android разработки' },
  { name: 'Xamarin', category: 'Mobile', description: 'Кроссплатформенная разработка от Microsoft' },
  
  // AI/ML
  { name: 'TensorFlow', category: 'AI/ML', description: 'Библиотека машинного обучения' },
  { name: 'PyTorch', category: 'AI/ML', description: 'Библиотека машинного обучения' },
  { name: 'Scikit-learn', category: 'AI/ML', description: 'Библиотека машинного обучения для Python' },
  { name: 'OpenCV', category: 'AI/ML', description: 'Библиотека компьютерного зрения' },
  { name: 'NLTK', category: 'AI/ML', description: 'Библиотека обработки естественного языка' },
  
  // Tools
  { name: 'Git', category: 'Tools', description: 'Система контроля версий' },
  { name: 'VS Code', category: 'Tools', description: 'Редактор кода' },
  { name: 'IntelliJ IDEA', category: 'Tools', description: 'IDE для Java' },
  { name: 'PyCharm', category: 'Tools', description: 'IDE для Python' },
  { name: 'WebStorm', category: 'Tools', description: 'IDE для веб-разработки' },
  { name: 'Postman', category: 'Tools', description: 'API клиент' },
  { name: 'Jira', category: 'Tools', description: 'Система управления проектами' },
  { name: 'Confluence', category: 'Tools', description: 'Платформа для совместной работы' },
  
  // Other
  { name: 'REST API', category: 'Other', description: 'Архитектурный стиль для веб-сервисов' },
  { name: 'GraphQL', category: 'Other', description: 'Язык запросов для API' },
  { name: 'Microservices', category: 'Other', description: 'Архитектурный стиль' },
  { name: 'Agile', category: 'Other', description: 'Методология разработки' },
  { name: 'Scrum', category: 'Other', description: 'Фреймворк Agile' },
  { name: 'Kanban', category: 'Other', description: 'Методология управления проектами' },
  { name: 'TDD', category: 'Other', description: 'Разработка через тестирование' },
  { name: 'BDD', category: 'Other', description: 'Разработка через поведение' },
];
