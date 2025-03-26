import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

import './App.css';
import Registration from '../src/components/Registration';
import Home from './components/Home';
import Quiz from './components/Quiz';
import ScoreBoard from './components/ScoreBoard';
import Review from './components/Review';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import QuizContext from './context/quizContext';

const App = () => {
    const [language, setPageLanguage] = useState("english");
    const [mode, setMode] = useState("Light");
    const [categoryType, setCategoryType] = useState("");
    const [level, setLevel] = useState("");
    const [category, setCategory] = useState('');
    const { categories, levels } = useContext(QuizContext);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [scoreBoard, setScoreBoard] = useState([]);

    useEffect(() => {
        document.title = "Quiz Game";
    }, []);

    const changeLanguage = newLang => setPageLanguage(newLang);

    const changeMode = () => { setMode(mode === 'Light' ? 'Dark' : 'Light') };

    const selectCategoryType = categoryType => { setCategoryType(categoryType) };

    const selectCategory = category => { setCategory(category) };

    const selectLevel = level => { setLevel(level) };

    const addSelectedAnswers = (answer) => setSelectedAnswers([...selectedAnswers, answer]);

    const clearSelectedAnswer = () => setSelectedAnswers([]);

    return (
        <BrowserRouter>
            <QuizContext.Provider value={{
                language, mode, changeLanguage, changeMode, categories, levels,
                selectCategoryType, selectCategory, selectLevel, categoryType, category, level,
                addSelectedAnswers, selectedAnswers, clearSelectedAnswer
            }}>
                <Routes>
                    <Route path="/authenticate" element={<Registration />} />
                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/quiz" element={<ProtectedRoute element={<Quiz />} />} />
                    <Route path="/scoreboard" element={<ProtectedRoute element={<ScoreBoard />} />} />
                    <Route path='/review/:id' element={<ProtectedRoute element={<Review />} />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
                <Analytics />
            </QuizContext.Provider>
        </BrowserRouter>
    );
}

export default App;