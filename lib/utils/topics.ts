export const topics = [
  {
    name: 'Workplace',
    subtopics: ['Work Culture', 'Work-Life Balance', 'Remote Work', 'Office Politics'],
  },
  {
    name: 'Compensation',
    subtopics: ['Salary', 'Bonuses', 'Stock Options', 'Negotiation'],
  },
  {
    name: 'Career',
    subtopics: ['Growth', 'Switching Jobs', 'Promotion', 'Interview'],
  },
  {
    name: 'Companies',
    subtopics: ['FAANG', 'Startups', 'Unicorns', 'MNCs'],
  },
  {
    name: 'Colleges',
    subtopics: ['Admissions', 'Placements', 'Exams', 'Campus Life'],
  },
  {
    name: 'Tech',
    subtopics: ['Engineering', 'Product', 'Design', 'Data Science'],
  },
];

export function getSubtopics(topicName: string): string[] {
  const topic = topics.find(t => t.name === topicName);
  return topic ? topic.subtopics : [];
} 