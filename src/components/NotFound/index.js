import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './index.css';

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="not-found-container">
            <Header />
            <div className="not-found-content">
                <img src='https://img.freepik.com/premium-vector/no-data-found-illustration-sites-banner-design-vector-illustration_620585-1690.jpg?w=500' alt="Not Found" className="not-found-image" />
                <h2>404 - Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
                <button onClick={goHome} className="home-button">Go to Home</button>
            </div>
        </div>
    );
}

export default NotFound;