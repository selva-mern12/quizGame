import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MdDelete } from 'react-icons/md';
import QuizContext from '../../context/quizContext';
import Header from '../Header';
import { Cookies } from 'react-cookie';
import './index.css';
import { FailureView, LoadingView } from '../quizPages';

const pageStatus = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    empty: 'EMPTY',
    failure: 'FAILURE'
};

const Scoreboard = () => {
    const { mode } = useContext(QuizContext);
    const [scoreBoardStatus, setScoreBoardStatus] = useState(pageStatus.initial)
    const [scoreBoard, setScoreBoard] = useState([]);
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwt_token');
    const userId = cookies.get('user_id');

    useEffect(() => {
        const getScoreBoard = async () => {
            setScoreBoardStatus(pageStatus.loading)
            try{
                const scoreBoardResponse = await fetch(`https://quiz-backend-kytv.onrender.com/quiz/scoreboard?userId=${userId}`,{
                method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}`}
                });
                if (scoreBoardResponse.ok) {
                    const data = await scoreBoardResponse.json();
                    setScoreBoard(data);
                    setScoreBoardStatus(data.length === 0 ? pageStatus.empty : pageStatus.success);
                } else {
                    setScoreBoard([]);
                    setScoreBoardStatus(pageStatus.failure);
                }
            }catch(error){
                console.log(error);
                setScoreBoardStatus(pageStatus.failure);
            }
        };
        getScoreBoard();
    }, []);

    const deleteScoreFromScoreBoard = async (id) => {
        try {
            setScoreBoardStatus(pageStatus.loading);
    
            const deleteResponse = await fetch(`https://quiz-backend-kytv.onrender.com/quiz/scoreboard?id=${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` }
            });
    
            if (deleteResponse.ok) {
                const deleteData = await deleteResponse.json();
                console.log(deleteData);
                setScoreBoard(prevScores => {
                    const updatedScores = prevScores.filter(item => item._id !== id);
                    setScoreBoardStatus(updatedScores.length === 0 ? pageStatus.empty : pageStatus.success);
                    return updatedScores;
                });
            }
        } catch (error) {
            console.log(error.message);
            setScoreBoardStatus(pageStatus.failure);
        }
    };
    

    scoreBoard.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

    const renderScoreBoard = () => {
        switch (scoreBoardStatus){
            case pageStatus.loading:
                return <LoadingView />
            case pageStatus.empty :
                return(
                    <div className="empty-scoreboard-container">
                        <h2 className="scoreboard-heading">Scoreboard</h2>
                        <p className="scoreboard-para">No Scores Available</p>
                        <p className="scoreboard-para">Play a quiz to add your score here!</p>
                        <Link to="/" className='nav-bar'>
                            <button className="back-button">Back to Home</button>
                        </Link>
                    </div>
                )
            case pageStatus.success :
                return(
                        <div className="review-main-container">
                            <h2 className="scoreboard-heading">Scoreboard</h2>
                            <table className="scoreboard-table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Level</th>
                                        <th>Score</th>
                                        <th>Completed by</th>
                                        <th>Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scoreBoard.map((entry) => (
                                        <tr key={entry._id}>
                                            <td>{entry.category}</td>
                                            <td>{entry.level}</td>
                                            <td>{entry.total_score}</td>
                                            <td>{formatDistanceToNow(new Date(entry.date_time), { addSuffix: true })}</td>
                                            <td className="review-del">
                                                <Link to={`/review/${entry._id}`}>
                                                    <button className="review-button">Review</button>
                                                </Link>
                                                <MdDelete
                                                    className="delete-button"
                                                    onClick={() => deleteScoreFromScoreBoard(entry._id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Link to="/" className='nav-link'>
                                <button className="back-button">Back to Home</button>
                            </Link>
                        </div>
                )
            case pageStatus.failure :
                return <FailureView />
            default:
                return null
        }
    }

    return(
        <div className={`scoreboard-container ${mode === 'Dark' ? 'dark' : 'light'}`}>
            <Header />
            <>{renderScoreBoard()}</>
        </div>
    )
};

export default Scoreboard;