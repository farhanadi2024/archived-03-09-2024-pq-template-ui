import { fetcher } from './fetcher';

interface QuestionText {
  id: string;
  eng: string;
}

interface Question {
  _id: string;
  question_text: QuestionText;
  input_type: 'Short answer' | 'Paragraph' | 'Multiple choice' | 'Checkbox' | 'Dropdown' | 'File upload' | 'Date'; // Add other input types as needed
  options: string[]; // Assuming options is an array of strings; you can adjust it based on actual needs
}

const fetchQuestions = () => fetcher<Question[]>('http://localhost:3001/api/question', { method: 'GET' });

export { fetchQuestions };
