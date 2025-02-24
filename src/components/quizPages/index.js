import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiStarFill, RiStarLine} from 'react-icons/ri';
import { SyncLoader } from "react-spinners";
import QuizContext from '../../context/quizContext';

const result = {
    0: "Try Again",
    1: "Needs Improvement",
    2: "Getting There",
    3: "Good",
    4: "Great",
    5: "Perfect"
}

export const LoadingView = () => (
    <div className="loading-container">
        <SyncLoader
            color="#000dff"
            margin={10}
            size={20}
            speedMultiplier={1}
        />
    </div>
)

export const EmptyQuiz = () =>{
    const {mode} = useContext(QuizContext)
    return (
    <div className={`home-bg-container ${mode==='Light'? 'home-bg-light':'home-bg-dark'}`}>
        <div className={`empty-questions-container ${mode==='Light' ? 'empty-question-light-container' : 'empty-question-dark-container'}`}>
            <h2 className='empty-questions-heading'>Quiz the Answer</h2>
            <p className='empty-questions-message'>No questions available for the selected category and level</p>
            <Link to='/' className='back-link nav-link'>Go back to Home</Link>
        </div>
    </div>
)}

export const SuccessQuiz = ({questions, selectedQuestion, selectAnswer, submitAnswer, nextQuestion, errorMsg}) =>{ 
    const {mode} = useContext(QuizContext)
    return(
    <div className={`home-bg-container ${mode==='Light'? 'home-bg-light':'home-bg-dark'}`}>
        <h2 className='quiz-heading'>Quiz the Answer</h2>
        <div className={`quiz-container ${mode==='Light' ? 'quiz-container-light': 'quiz-container-dark'}`}>
            {questions.map((question, index) => (
                question.id === selectedQuestion.id && (
                <div key={question.id} className='question-container'>
                    <h3 className='question'>{question.question}</h3>
                    <ul className='options'>
                        {question?.options?.map((option, index) => (
                            <li key={index} className='option'>
                                <input type="radio" id={option} name={question.id} value={option}
                                onChange={() => selectAnswer(question.id,option)}
                                className='option-input' />
                                <label htmlFor={option} className='option-label'>{option}</label>
                            </li>
                        ))}
                    </ul>
                    {questions.length - 1 === index ? 
                    (<button type='button' className='submit-button' 
                    onClick={submitAnswer}>Submit</button>) : 
                    (<button type='button' className='submit-button'
                    onClick={nextQuestion}>Next</button>)}
                    <p className='error-msg'>{errorMsg ? errorMsg : ' '}</p>
                </div>
                )
            ))}
        </div>
    </div>
)
}

export const QuizResult = ({score}) => {
    const {mode} = useContext(QuizContext)
    
    const renderStars = () => {
        const stars = [];
    
        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                stars.push(<RiStarFill key={i} />);
            } else {
                stars.push(<RiStarLine key={i} />);
            }
        }
    
        return (
            <div className={`star-container ${mode === 'light' ? 'star-container-light' : 'star-container-dark'}`}>
                {stars}
            </div>
        );
    };
    

    return(
        <div className={`home-bg-container ${mode==='Light' ? 'home-bg-light' : 'home-bg-dark'}`}>
            <div className={`completed-quiz-container ${mode==='Light'? 'completed-quiz-container-light' : 'completed-quiz-container-dark'}`}>  
                <h2 className='completed-quiz-heading'>Quiz Completed</h2>
                <p className='completed-quiz-message'>You have completed this quiz.</p>
                <h2 className={`score-result ${mode==='Light' ? 'score-result-light' : 'score-result-dark'}`}>{result[score]}</h2>
                    {renderStars()}
                <p className='your-score'>Your Score: {score}</p>
                <div>
                    <Link to='/scoreboard' >
                        <button className='submit-button'>View Scoreboard</button>
                    </Link>
                    <Link to="/" className='nav-link'>
                        <button className="back-button">Home</button>
                    </Link>
                </div>
            </div>
        </div>
)}

export const FailureView = () => {
    const { mode } = useContext(QuizContext);
    return (
        <div className={`home-bg-container ${mode === 'Light' ? 'home-bg-light' : 'home-bg-dark'}`}>
            <div className={'failure-container'}>
                <div className='failure-bg-container'>
                    <h2 className='failure-heading'>Server or Internet Issue</h2>
                    <p className='failure-message'>There was a problem connecting to the server or your internet connection is down. Please try again later.</p>
                    <Link to='/' className='back-link'> Go back to Home</Link>
                </div>
            </div>
        </div>
    );
}