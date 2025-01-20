export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  email: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  visitedQuestions: Set<number>;
  timeRemaining: number;
  quizStatus: 'not_started' | 'in_progress' | 'completed';
}

export interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

export type QuizAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'SET_CURRENT_QUESTION'; payload: number }
  | { type: 'SET_ANSWER'; payload: { questionIndex: number; answer: string } }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'START_QUIZ' };