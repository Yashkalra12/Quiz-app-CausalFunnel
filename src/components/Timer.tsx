import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export function Timer() {
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    if (state.quizStatus !== 'in_progress') return;

    const timer = setInterval(() => {
      if (state.timeRemaining <= 0) {
        dispatch({ type: 'COMPLETE_QUIZ' });
        clearInterval(timer);
      } else {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeRemaining - 1 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeRemaining, state.quizStatus]);

  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;

  return (
    <div className="flex items-center gap-2 text-xl font-semibold">
      <Clock className="w-6 h-6" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}