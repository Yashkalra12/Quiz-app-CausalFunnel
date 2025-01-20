import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { CheckCircle, XCircle } from 'lucide-react';

export function ReportPage() {
  const { state } = useQuiz();
  
  const calculateScore = () => {
    return state.questions.reduce((score, question, index) => {
      return score + (state.answers[index] === question.correct_answer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
          <p className="text-lg mb-4">
            Score: {calculateScore()} out of {state.questions.length}
          </p>
          <p className="text-gray-600 mb-6">Email: {state.email}</p>

          <div className="space-y-6">
            {state.questions.map((question, index) => (
              <div key={index} className="border-t pt-4">
                <h3 className="font-semibold mb-2">
                  Question {index + 1}
                </h3>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Your Answer:</p>
                    <div className="p-3 rounded-lg bg-gray-50 flex items-start gap-2">
                      {state.answers[index] === question.correct_answer ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span dangerouslySetInnerHTML={{ __html: state.answers[index] || 'Not answered' }} />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Correct Answer:</p>
                    <div className="p-3 rounded-lg bg-green-50 flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}