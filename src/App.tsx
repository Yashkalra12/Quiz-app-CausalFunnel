import React from 'react';
import { QuizProvider } from './context/QuizContext';
import { StartPage } from './components/StartPage';
import { QuizPage } from './components/QuizPage';
import { ReportPage } from './components/ReportPage';
import { useQuiz } from './context/QuizContext';

function QuizApp() {
  const { state } = useQuiz();

  switch (state.quizStatus) {
    case 'not_started':
      return <StartPage />;
    case 'in_progress':
      return <QuizPage />;
    case 'completed':
      return <ReportPage />;
  }
}

function App() {
  return (
    <QuizProvider>
      <div>
        {/* Top bar */}
        <header className="bg-blue-600 text-white text-center p-2">
          Assignment submitted by Yash Kalra
        </header>

        {/* Main App */}
        <QuizApp />
      </div>
    </QuizProvider>
  );
}

export default App;
