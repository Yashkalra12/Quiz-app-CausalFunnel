
# Quiz Application

## Overview

This application is a feature-rich quiz system that allows users to take a timed quiz, navigate between questions, and view their performance in a detailed report. The application fetches questions dynamically from the Open Trivia Database API and provides an intuitive and responsive user experience.

---

## Features

### 1. **Quiz Layout & Flow**
- **Start Page**: Users begin the quiz by submitting their email address.
- **Quiz Questions**: The application displays 15 questions fetched from the OpenTDB API.
- **Timer**: A countdown timer is displayed, starting from 30 minutes. The quiz auto-submits when the timer reaches zero.

### 2. **Navigation**
- Users can navigate to specific questions using a question navigation panel.
- An overview panel displays:
  - Visited questions.
  - Attempted questions.

### 3. **End of Quiz**
- At the end of the quiz or when the timer expires:
  - Users are directed to a report page.
  - The report shows each question, the user's answer, and the correct answer side-by-side for easy comparison.

### 4. **Data Source**
- Questions are fetched dynamically from [OpenTDB API](https://opentdb.com/api.php?amount=15).
- Choices for each question are created by combining the `correct_answer` and `incorrect_answers` parameters from the API.

---

## Architecture

- **State Management**: React Context is used for centralized state management.
- **Type Safety**: TypeScript ensures type safety throughout the application.
- **Styling**: Tailwind CSS provides a responsive and modern design.
- **Component-Based**: The application is modular and reusable with clearly defined components.

---

## Components

1. **StartPage**: Collects the user's email and initializes the quiz.
2. **QuizPage**: Displays the quiz interface with the timer, questions, and navigation.
3. **Timer**: Manages and displays the countdown timer.
4. **QuestionNavigation**: Displays an overview of questions and their statuses.
5. **ReportPage**: Provides a detailed report of the user's performance.

---

## Implementation Details

### State Management
- Tracks visited and attempted questions.
- Stores user answers.
- Manages the timer and quiz status.

### Key Functionalities
- **Dynamic Question Fetching**: Integrates with the OpenTDB API to retrieve questions in real time.
- **Auto-Submit**: Automatically submits the quiz when the timer expires.
- **Responsive Design**: Adapts seamlessly to different screen sizes.

---

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run the Development Server**:
   ```bash
   npm run dev
   ```

---

## Challenges Faced

1. **Dynamic Question Handling**: 
   - Parsing data from the API and dynamically generating options using the `correct_answer` and `incorrect_answers` parameters required careful handling of data structures.

2. **Timer Synchronization**: 
   - Ensuring that the timer state was synchronized across components and correctly triggered the auto-submit functionality.

3. **Navigation and State Management**: 
   - Maintaining the status of each question (visited/attempted) while allowing seamless navigation proved complex.

4. **Responsive Design**: 
   - Adapting the layout for different screen sizes required detailed planning and testing with Tailwind CSS.

---

## How to Use

1. Start the application and enter your email address to begin.
2. Navigate through questions using the question panel or the Next/Previous buttons.
3. Submit your answers for each question.
4. View a detailed performance report after completing the quiz or when the timer expires.

---

## Judgment Criteria

- **Functionality**: All specified features are implemented and work as expected.
- **Bug-Free Code**: The application runs without errors or unexpected behavior.
- **Code Quality**: The codebase is clean, modular, and adheres to best practices, including reusability and proper commenting.

---

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- OpenTDB API

---

This quiz application is a robust implementation that balances functionality, performance, and user experience. Feel free to contribute or suggest improvements!