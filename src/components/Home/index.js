import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { Cookies } from 'react-cookie';
import quizContext from '../../context/quizContext';

import './index.css';

const Home = () => {
    const { levels, categories, selectCategoryType, mode, selectCategory, selectLevel, categoryType, category, level,
        language, changeLanguage
      } = useContext(quizContext);

    const [rotate, setRotate] = useState(false)
    
    const cookies = new Cookies();
    const name = cookies.get('name');
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('')

    const handleQuizPage = () => {
        if(!category){
            setErrorMsg('Please select category')
            setTimeout(() => setErrorMsg(''), 2000);
            return;
        }
        if(!level){
            setErrorMsg('Please select level')
            setTimeout(() => setErrorMsg(''), 2000);
            return;
        }
        navigate('/quiz')
    }

    console.log({language})

    return (
        <div className='home-main-container'>
            <Header home/>
            <div className={`home-bg-container ${mode === 'Light' ? 'home-bg-light' : 'home-bg-dark'}`}>
            {window.innerWidth <= 570 && <h1 className={`user-name ${mode!=='Light' ? 'user-name-dark' : ''}`}>{`Hii ${name}`}</h1>}
                <h1 className='home-heading'>Choose your Questions</h1>
                <div className={`home-container ${mode === 'Light' ? 'home-light-mode' : 'home-dark-mode'}`}>
                    <div className='category-level-container'>
                        <div className='categories-main-container'>
                            <h3 className='category-level'>Select category</h3>
                            <ul className='category-types-container' >
                                {categories?.map(categoryTypes => (
                                    <li
                                        key={categoryTypes.categoryTypeId}
                                        className={`category-type ${mode === 'Light' ? 'category-type-light' : 'category-type-dark'}`}
                                        {...(window.innerHeight <= 769 
                                            ? { onMouseEnter: () => setTimeout(() => selectCategoryType(categoryTypes.categoryType), 100) } 
                                            : { onClick: () => setTimeout(() => selectCategoryType(categoryTypes.categoryType), 100) }
                                        )}
                                        
                                        onMouseLeave={() => selectCategoryType("")}
                                    >
                                        <h5>{categoryTypes.categoryType}</h5>
                                        {categoryType === categoryTypes.categoryType && (
                                            <ul className={`categories-container ${mode === 'Light' ? 'categories-container-light' : 'categories-container-dark'}`}>
                                                {categoryTypes.subcategories.map(category => (
                                                    <li
                                                        key={category.categoryId}
                                                        onClick={() => {
                                                            selectCategory(category.category) 
                                                            selectCategoryType("")
                                                            setErrorMsg('')}}
                                                        className='category'
                                                    >
                                                        {category.category}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='difficulty-container'>
                            <h3 className='category-level'>Select Level</h3>
                            <ul className='levels-container'>
                                {levels.map(level => (
                                    <li
                                        key={level.levelId}
                                        onClick={() => {
                                            selectLevel(level.level)
                                            setErrorMsg('')}}
                                        className={`level ${mode === 'Light' ? 'level-light' : 'level-dark'}`}
                                    >
                                        {level.level}
                                    </li>
                                ))}
                            </ul>
                            <div className="language-container">
                                <button className={`${language === 'english' ? `language-icon ${rotate ? 'en-icon' : ''}` : `language-button ${rotate ? 'en-button' : ''}`}`}
                                    onClick={() => {changeLanguage('english')
                                        setRotate(prevState => !prevState)
                                        setTimeout(() => {setRotate(prevState => !prevState)}, 300)}
                                    }>{language === 'tamil' ? 'English' : 'A'}</button>
                                <button className={`${language === 'tamil' ? `language-icon ${rotate ? 'ta-icon' : ''}` : `language-button ${rotate ? 'tn-button' : ''}`}`} 
                                    onClick={() => {changeLanguage('tamil')
                                        setRotate(prevState => !prevState)
                                        setTimeout(() => {setRotate(prevState => !prevState)}, 300)}}>{language === 'tamil' ? 'அ' : 'தமிழ்'}</button>
                            </div>
                            <p>Current Language: <span className='languages'>{language === 'english'? 'English' : 'தமிழ்'}</span></p>
                            <div className={`selected-category-level ${mode === 'Light' ? 'selected-light' : 'selected-dark'}`}>
                                <p>
                                    Category: {category ? (
                                        <span className={`${mode === 'Light' ? 'selected-word-light' : 'selected-word-dark'}`}>{category}</span>
                                    ) : (
                                        <span className={`${mode === 'Light' ? 'dummy-word-light' : 'dummy-word-dark'}`}>Select Category</span>
                                    )}
                                </p>
                                <p>
                                    Level: {level ? (
                                        <span className={`${mode === 'Light' ? 'selected-word-light' : 'selected-word-dark'}`}>{level}</span>
                                    ) : (
                                        <span className={`${mode === 'Light' ? 'dummy-word-light' : 'dummy-word-dark'}`}>Select Level</span>
                                    )}
                                </p>
                            </div>
                            <button type='button' className='start-quiz' onClick={handleQuizPage}>
                                Start Quiz
                            </button>
                            {errorMsg !== '' ? <p className='password-checker'>{errorMsg}</p> : <p className='dummy-error'>'selva'</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;