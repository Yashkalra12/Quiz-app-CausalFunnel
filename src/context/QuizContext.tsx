import React, { createContext, useContext, useReducer } from 'react';
import { QuizState, QuizAction, QuizContextType } from '../types';

const initialState: QuizState = {
  email: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  visitedQuestions: new Set(),
  timeRemaining: 30 * 60, // 30 minutes in seconds
  quizStatus: 'not_started',
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_CURRENT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload,
        visitedQuestions: new Set([...state.visitedQuestions, action.payload]),
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionIndex]: action.payload.answer,
        },
      };
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.payload };
    case 'START_QUIZ':
      return { ...state, quizStatus: 'in_progress' };
    case 'COMPLETE_QUIZ':
      return { ...state, quizStatus: 'completed' };
    default:
      return state;
  }
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}