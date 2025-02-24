import React, { useContext, useState, useEffect } from 'react';
import Header from '../Header';
import quizContext from '../../context/quizContext';
import { Cookies } from 'react-cookie';
import './index.css';
import { EmptyQuiz, LoadingView, QuizResult, SuccessQuiz, FailureView } from '../quizPages';

const pageStatus = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    completed: 'COMPLETED',
    empty: 'EMPTY',
    failure: 'FAILURE'
};

const Quiz = () => {
    const { level, category, language, addSelectedAnswers, selectedAnswers, clearSelectedAnswer,
     } = useContext(quizContext);

    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [score, setScore] = useState(0);
    const [quizPageStatus, setQuizPageStatus] = useState(pageStatus.initial);

    const cookies = new Cookies();
    const jwtToken = cookies.get('jwt_token');
    const userId = cookies.get('user_id');

    useEffect(() => {
        getQuestion();
    }, []);

    const getQuestion = async () => {
        setQuizPageStatus(pageStatus.loading);
        try {
            const questionResponse = await fetch(`https://quiz-backend-kytv.onrender.com/quiz/data?category=${encodeURIComponent(category)}&difficulty=${level}&language=${language}`,{
                method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}`}
            });
            const questionData = await questionResponse.json();
            if (questionResponse.ok) {
                if (questionData.length === 0) {
                    return setQuizPageStatus(pageStatus.empty);
                }
                setQuestions(questionData);
                setSelectedQuestion(questionData[0] || {});
                setQuizPageStatus(pageStatus.success);
            } else {
                setQuizPageStatus(pageStatus.failure);
            }
        } catch (error) {
            setQuizPageStatus(pageStatus.failure);
        }
    };

    const nextQuestion = () => {
        if (Object.keys(selectedAnswer).length !== 0) {
            if (selectedAnswer.option === selectedQuestion.answer) {
                setScore(prevScore => prevScore + 1);
            }
            addSelectedAnswers(selectedAnswer);
            setSelectedQuestion(questions[questions.indexOf(selectedQuestion) + 1]);
            setSelectedAnswer({});
            setErrorMsg('');
        } else {
            setErrorMsg('Please select an option to proceed');
        }
    };

    const submitAnswer = () => {
        if (Object.keys(selectedAnswers).length !== 0) {
            setQuizPageStatus(pageStatus.loading);
            if (selectedAnswer.option === selectedQuestion.answer) {
                setScore(prevScore => {
                    const newScore = prevScore + 1;
                    return newScore;
                });
            }
            addSelectedAnswers(selectedAnswer);
            setSelectedAnswer({});
            setErrorMsg('');

            setTimeout(() => {
                setQuizPageStatus(pageStatus.completed);
            }, 300);
        } else {
            setErrorMsg('Please select an option to proceed');
        }
    };

    const addScoreBoard = async () => {
        try {
            const totalScore = selectedAnswers.reduce((acc, answer) => {
                const question = questions.find(q => q.id === answer.id);
                return question && answer.option.trim().toLowerCase() === question.answer.trim().toLowerCase()
                    ? acc + 1
                    : acc;
            }, 0);
    
            const addScoreBoardUrl = 'https://quiz-backend-kytv.onrender.com/quiz/scoreboard';
    
            const addScoreBoardOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` },
                body: JSON.stringify({
                    userId,
                    category,
                    level,
                    totalScore, // Use calculated total score
                    dateTime: new Date(),
                    questionSet: questions.map((question) => ({
                        id: question.id,
                        question: question.question,
                        answer: question.answer,
                        selectedAnswer: selectedAnswers.find(answer => answer.id === question.id)?.option || null,
                    }))
                }),
            };
    
            const addScoreBoardResponse = await fetch(addScoreBoardUrl, addScoreBoardOption);
    
            if (addScoreBoardResponse.ok) {
                console.log('✅ Scoreboard Successfully added:', totalScore);
            } else {
                console.error('❌ Error adding scoreboard');
            }
        } catch (error) {
            console.error('⚠️ Fetch error:', error);
        }
    };
    

    useEffect(() => {
        if (quizPageStatus === pageStatus.completed) {
            addScoreBoard();
            setQuestions([]);
            clearSelectedAnswer();
        }
    }, [quizPageStatus]);

    const selectAnswer = (id, option) => setSelectedAnswer({ id, option });

    const renderQuizPage = () => {
        switch (quizPageStatus) {
            case pageStatus.loading:
                return <LoadingView />;
            case pageStatus.empty:
                return <EmptyQuiz />;
            case pageStatus.success:
                return (
                    <SuccessQuiz
                        questions={questions}
                        selectedQuestion={selectedQuestion}
                        selectAnswer={selectAnswer}
                        submitAnswer={submitAnswer}
                        nextQuestion={nextQuestion}
                        errorMsg={errorMsg}
                    />
                );
            case pageStatus.completed:
                return <QuizResult score={score} />;
            case pageStatus.failure:
                return <FailureView />;
            default:
                return null;
        }
    };

    return (
        <div className='home-main-container'>
            <Header />
            <>{renderQuizPage()}</>
        </div>
    );
};

export default Quiz;