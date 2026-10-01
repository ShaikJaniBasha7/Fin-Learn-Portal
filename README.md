# Personal Finance Learning Portal

A simple ReactJS college assignment project created by a 3rd-year Computer Science Engineering (CSE) student.

---

## 🎯 Problem Statement
Many college students lack basic knowledge about personal savings, budgeting, and financial decision-making. This project provides an easy-to-use educational portal to teach basic personal finance concepts, evaluate knowledge through a quiz, and offer simple budget/savings calculators.

---

## ✨ Features
1. **Home Page**: Overview of the portal with website introduction and navigation cards.
2. **Learn Page**: 5 essential topic cards (*Saving*, *Budgeting*, *Needs vs Wants*, *Emergency Fund*, *50/30/20 Rule*) with descriptions, examples, and a "Mark as Completed" button.
3. **Quiz Page**: 5-question multiple-choice quiz with option selection, score calculation, percentage display, and restart capability.
4. **Calculators Page**:
   - **Monthly Budget Calculator**: Calculates `totalExpenses` and `remainingMoney` ($Income - Total Expenses$).
   - **Savings Calculator**: Calculates approximate `monthsRequired` ($Savings Goal / Monthly Savings$).
   - **Validation**: Checks for empty fields and negative values with clear error messages.
5. **About Page**: Describes the project goals, learning objectives, and tech stack.

---

## 💻 Technologies Used
- **ReactJS** (Functional Components, JSX)
- **React Hooks** (`useState`)
- **React Router DOM** (`BrowserRouter`, `Routes`, `Route`, `Link`)
- **JavaScript ES6**
- **HTML5 & CSS3**
- **Vite**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Header navigation bar
│   ├── Card.jsx           # Reusable card component
│   └── QuizQuestion.jsx   # Quiz question display component
├── pages/
│   ├── Home.jsx           # Home page
│   ├── Learn.jsx          # Educational topics page
│   ├── Quiz.jsx           # 5-question quiz page
│   ├── Calculator.jsx     # Budget & Savings calculators page
│   └── About.jsx          # About page
├── data/
│   └── quizData.js        # Quiz questions dataset
├── App.jsx                # Main application component & routes
├── main.jsx               # Entry point
└── index.css              # Custom CSS styles
```

---

## 🚀 How to Run the Project

1. Open your terminal in the project directory:
   ```bash
   cd c:\Users\janis\OneDrive\Documents\langchain
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the local web address displayed in the terminal (e.g. `http://localhost:3000`).
