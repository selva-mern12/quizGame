import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuizContext from '../../context/quizContext';
import { formatDistanceToNow } from 'date-fns';
import { Cookies } from 'react-cookie';
import Header from '../Header';
import { FailureView, LoadingView } from '../quizPages';
import './index.css';

const pageStatus = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
};

const Review = () => {
    const { id } = useParams();
    const { mode } = useContext(QuizContext);
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwt_token');
    const [reviewScore, setReviewScore] = useState({})
    const [reviewPageStatus, setReviewPageStatus] = useState(pageStatus.initial)

    useEffect(() => {
        const getReviewDetails = async () => {
            try{
                setReviewPageStatus(pageStatus.loading)
                const reviewScoreResponse = await fetch(`https://quiz-backend-kytv.onrender.com/quiz/scoreboard?id=${id}`,{
                method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}`}
                });
                if (reviewScoreResponse.ok) {
                    const reviewScore = await reviewScoreResponse.json();
                    setReviewScore(reviewScore[0]);
                    setReviewPageStatus(pageStatus.success)
                }
            }catch(error){
                console.log(error);
                setReviewPageStatus(pageStatus.failure)
            }
        };
        getReviewDetails();
    }, []);

    const completedDate = reviewScore?.date_time ? new Date(reviewScore.date_time) : null;

    const renderReviewPage = () => {
        switch (reviewPageStatus){
            case pageStatus.loading:
                return <LoadingView />
            case pageStatus.success:
                return (
                    <div className='review-main-container'>
                        <h2 className='review-heading'>Review</h2>
                        <div className='review-details'>
                            <p>Category: {reviewScore?.category}</p>
                            <p>Level: {reviewScore?.level}</p>
                            <p>Score: {reviewScore?.total_score}</p>
                            <p>Completed by: {completedDate ? formatDistanceToNow(completedDate, { addSuffix: true }) : 'N/A'}</p>

                        </div>
                        <ul className='review-questions'>
                            {reviewScore?.question_set?.map((question) => (
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
                )
            case pageStatus.failure:
                return <FailureView />
        }
    }

    return (
        <div className={`review-container ${mode === 'Dark' ? 'dark' : 'light'}`}>
            <Header />
            <>{renderReviewPage()}</>
        </div>
    );
};

export default Review;