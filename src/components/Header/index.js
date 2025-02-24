import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CiSun, CiDark } from "react-icons/ci";
import { GrScorecard } from "react-icons/gr";
import { RiLogoutCircleRLine } from "react-icons/ri";
import quizContext from "../../context/quizContext";
import { Cookies } from "react-cookie";
import "./index.css";

const Header = ({home}) => {
    const { mode, changeMode } = useContext(quizContext);
    const [rotate, setRotate] = useState(false);
    const cookies = new Cookies();
    const name = cookies.get('name');

    const handleModeChange = () => {
        setRotate(true);
        changeMode();
        setTimeout(() => setRotate(false), 500);
    };

    const onLogout = () => {
        cookies.remove('jwt_token');
        cookies.remove('user_id');
        cookies.remove('name');
        window.location.href = '/authenticate';
    };

    return (
        <div className={`header-container ${mode === "Light" ? "light" : "dark"}`}>
            <Link to="/" className="nav-link">
                <h1 className="app-name">Quiz Game</h1>
            </Link>
            {window.innerWidth >= 570 && home && <h1 className={`user-name ${mode!=='Light' ? 'user-name-dark' : ''}`}>{`Hii, ${name}`}</h1>}
            <div className="header-buttons">
                <div
                    onClick={handleModeChange}
                    className={`mode-button-container ${mode === "Light" ? "mode-button-light-container" : "mode-button-dark-container"}`}
                >
                    <div className="mode-slider">
                        {mode === "Light" ? <CiSun className={rotate ? "rotate" : ""} /> : <CiDark className={rotate ? "rotate" : ""} />}
                    </div>
                </div>

                <Link to="/scoreboard">
                    <button className={`score-log-button ${mode === "Light" ? "score-log-light-button" : "score-log-dark-button"}`}>
                        {window.innerWidth >= 769 ? 'Scoreboard' : <GrScorecard />}
                    </button>
                </Link>

                <button className={`score-log-button ${mode === "Light" ? "score-log-light-button" : "score-log-dark-button"}`}
                    onClick={onLogout}>
                    {window.innerWidth >= 769 ? 'Logout' : <RiLogoutCircleRLine />}
                </button>
            </div>
        </div>
    );
};

export default Header;
