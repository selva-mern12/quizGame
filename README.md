Welcome to my 🧠 Quiz Game (front end)

A **React-based** frontend application for a quiz game that supports **Tamil & English**, multiple categories, and difficulty levels.  

 📌 Features

✔️ **Multi-language Support** (Tamil & English)  
✔️ **Various Categories & Difficulty Levels**  
✔️ **User Authentication** (Register/Login)  
✔️ **Quiz Review Feature** (Check Your Answers)  
✔️ **Scoreboard to Track Performance**  
✔️ **Dark Mode & Light Mode** 🌗  
✔️ **Protected Routes for Secure Access**  
✔️ **Reusable Components for Efficiency**  
✔️ **Internet Connection Required**  


---

 🏗️ Tech Stack  

| Technology         | Purpose              |
|--------------------|----------------------|
| **React.js**       | Frontend UI          |
| **React Router**   | Navigation           |
| **React Cookies**  | Manage User Sessions |
| **React Icons**    | UI Icons             |
| **React Spinners** | Loading Indicators   |
| **ReactJS Popup**  | Modals & Popups      |
| **CSS Modules**    | Styling              |


---

📥 Installation Guide  

**Step 1: Clone Repository**  

git clone https://github.com/selva-mern12/quizGame quiz-frontend

**Step 2: Install Dependencies**

npm install

**Step 3: Run the Application**

npm start

```

**⚙️ Project Structure**

📂 quiz-frontend
│── 📂 public               # Static Assets
│── 📂 src
│   ├── 📂 components       # Reusable Components (All have index.js & index.css)
│   ├── 📂 main-route       # Main Pages (Routing)
│   │   ├── 📂 Home
│   │   ├── 📂 Quiz
│   │   ├── 📂 Registration
│   │   ├── 📂 Review
│   │   ├── 📂 ScoreBoard
│   ├── 📂 reusable         # Shared UI Components
│   │   ├── 📂 Header
│   │   ├── 📂 quizPages
│   │       ├── LoadingView
│   │       ├── FailureView
│   │       ├── QuizSuccess
│   │       ├── QuizEmpty
│   │       ├── QuizCompleted
│   ├── 📂 context          # Global State Management (Theme, Auth, Quiz)
│   │   ├── 📂 quizContext
│   │       ├── index.js
│   ├── 📂 protectedRoutes  # Route Guards for Authentication
│   ├── 📄 App.js           # Main App Component
│   ├── 📄 App.css          # Global Styles
│   ├── 📄 index.js         # Entry Point
│── 📄 package.json         # Dependencies & Scripts
│── 📄 README.md            # Project Documentation

```

```
🚀 Future Enhancements
🔹 More Questions – Expand the database.
🔹 Leaderboard – Track top users.
🔹 Sound Effects & Animations – Improve user experience.
🔹 Timed Quizzes – Add time-based challenges.
```

📜 License
This project is open-source and available under the MIT License.

