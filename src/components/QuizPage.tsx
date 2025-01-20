import React, { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Timer } from './Timer';
import { QuestionNavigation } from './QuestionNavigation';

export function QuizPage() {
  const { state, dispatch } = useQuiz();
  const currentQuestion = state.questions[state.currentQuestionIndex];
  
  // Use useMemo to ensure choices only randomize when the question changes
  const choices = useMemo(() => {
    return [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion.correct_answer, currentQuestion.incorrect_answers]);

  const handleAnswer = (answer: string) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionIndex: state.currentQuestionIndex, answer },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold">Quiz in Progress</h1>
          <Timer />
        </div>

        <QuestionNavigation />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Question {state.currentQuestionIndex + 1} of {state.questions.length}
          </h2>
          <p className="text-lg mb-6" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

          <div className="space-y-3">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(choice)}
                className={`w-full p-4 text-left rounded-lg border transition-colors
                  ${state.answers[state.currentQuestionIndex] === choice
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50 border-gray-200'}`}
                dangerouslySetInnerHTML={{ __html: choice }}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => dispatch({
                type: 'SET_CURRENT_QUESTION',
                payload: Math.max(0, state.currentQuestionIndex - 1),
              })}
              disabled={state.currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            
            {state.currentQuestionIndex === state.questions.length - 1 ? (
              <button
                onClick={() => dispatch({ type: 'COMPLETE_QUIZ' })}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => dispatch({
                  type: 'SET_CURRENT_QUESTION',
                  payload: Math.min(state.questions.length - 1, state.currentQuestionIndex + 1),
                })}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}