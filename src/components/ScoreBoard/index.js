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
    const { mode, addScoreBoardContext, updateScoreBoard, scoreBoard } = useContext(QuizContext);
    const [scoreBoardStatus, setScoreBoardStatus] = useState(pageStatus.initial)

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
                    const scoreBoardData = await scoreBoardResponse.json();
                    addScoreBoardContext(scoreBoardData);
                    scoreBoardData.length === 0 ? 
                        setScoreBoardStatus(pageStatus.empty) : 
                        setScoreBoardStatus(pageStatus.success);
                } else {
                    addScoreBoardContext([]);
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
        const deleteResponse = await fetch(`https://quiz-backend-kytv.onrender.com/quiz/scoreboard?id=${id}`, {
            method: 'DELETE',headers: {'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}`}
        });
        if (deleteResponse.ok) {
            updateScoreBoard(id);
        }
    };

    scoreBoard.sort((a, b) => new Date(b.id) - new Date(a.id));

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
                                        <tr key={entry.id}>
                                            <td>{entry.category}</td>
                                            <td>{entry.level}</td>
                                            <td>{entry.total_score}</td>
                                            <td>{formatDistanceToNow(new Date(entry.date_time), { addSuffix: true })}</td>
                                            <td className="review-del">
                                                <Link to={`/review/${entry.id}`}>
                                                    <button className="review-button">Review</button>
                                                </Link>
                                                <MdDelete
                                                    className="delete-button"
                                                    onClick={() => deleteScoreFromScoreBoard(entry.id)}
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