import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

export function StartPage() {
  const { dispatch } = useQuiz();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      const data = await response.json();
      
      dispatch({ type: 'SET_EMAIL', payload: email });
      dispatch({ type: 'SET_QUESTIONS', payload: data.results });
      dispatch({ type: 'START_QUIZ' });
    } catch (error) {
      setError('Failed to fetch questions. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}