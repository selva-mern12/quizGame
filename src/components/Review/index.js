import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import QuizContext from '../../context/quizContext';
import { formatDistanceToNow } from 'date-fns';
import Header from '../Header';
import './index.css';

const Review = () => {
    const { id } = useParams();
    const { mode, scoreBoard } = useContext(QuizContext);
    const navigate = useNavigate()


    const reviewData = scoreBoard.find(item => String(item.id) === String(id));

    useEffect(() => {
        if (!reviewData) {
            navigate('/');
        }
    }, [reviewData, navigate]);

    const completedDate = reviewData?.date_time ? new Date(reviewData.date_time) : null;

    return (
        <div className={`review-container ${mode === 'Dark' ? 'dark' : 'light'}`}>
            <Header />
            <div className='review-main-container'>
                <h2 className='review-heading'>Review</h2>
                <div className='review-details'>
                    <p>Category: {reviewData?.category}</p>
                    <p>Level: {reviewData?.level}</p>
                    <p>Score: {reviewData?.total_score}</p>
                    <p>Completed by: {completedDate ? formatDistanceToNow(completedDate, { addSuffix: true }) : 'N/A'}</p>

                </div>
                <ul className='review-questions'>
                    {reviewData?.question_set?.map((question) => (
                        <li key={question.id} className='review-question'>
                            <h3>{question.question}</h3>
                            <p>Your Answer: {question.selectedAnswer}</p>
                            <p>Correct Answer: {question.answer}</p>
                        </li>
                    ))}
                </ul>
                <Link to='/scoreboard' className='nav-bar'>
                    <button className='back-button'>Back to Scoreboard</button>
                </Link>
            </div>
        </div>
    );
};

export default Review;