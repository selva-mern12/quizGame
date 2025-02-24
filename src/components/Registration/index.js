import { useState } from 'react';
import { Navigate } from 'react-router-dom'
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Cookies } from 'react-cookie';
import './index.css';

const Registration = () => {
    const cookies = new Cookies();
    const [yourName, setYourname] = useState('');
    const [registerUserName, setRegisterUserName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [passwordChecker, setPasswordChecker] = useState('');
    const [registerShowPassword, setRegisterShowPassword] = useState(false);
    const [registerShowLable, setRegisterShowLable] = useState({ name: false, username: false, password: false });
    const [registerStatus, setRegisterStatus] = useState('');
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginShowPassword, setLoginShowPassword] = useState(false);
    const [loginShowLable, setLoginShowLable] = useState({ name: false, username: false, password: false });
    const [loginStatus, setLoginStatus] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [loginPage, setLoginPage] = useState(false);

    const passwordCheck = (password) => {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const special = "!@#$%^&*()_+{}[]<>?/|";

        let hasUpper = false;
        let hasLower = false;
        let hasNumber = false;
        let hasSpecial = false;

        for (let char of password) {
            if (upper.includes(char)) hasUpper = true;
            else if (lower.includes(char)) hasLower = true;
            else if (numbers.includes(char)) hasNumber = true;
            else if (special.includes(char)) hasSpecial = true;
        }

        if (password.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial) {
            setPasswordChecker("Password Strength: Strong");
        } else if (password.length >= 6 && (hasUpper || hasLower) && hasNumber) {
            setPasswordChecker("Password Strength: Medium");
        } else if (password === "") {
            setPasswordChecker("");
        } else {
            setPasswordChecker("Password Strength: Weak");
        }
    };

    const handleRegisterPassword = event => {
        setRegisterPassword(event.target.value);
        passwordCheck(event.target.value);
    };

    const onRegister = async (event) => {
        event.preventDefault();

        if (!yourName) {
            return setRegisterStatus('Please provide your name.');
        }
        if (!registerUserName) {
            return setRegisterStatus('Please provide a username.');
        }
        if (!registerPassword) {
            return setRegisterStatus('Please provide a password.');
        }

        setRegisterStatus('Registering...');

        const userDetails = { name: yourName, username: registerUserName, password: registerPassword };

        try {
            const response = await fetch('https://quiz-backend-kytv.onrender.com/quiz/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userDetails }),
            });

            const data = await response.json();

            if (response.ok) {
                setRegisterStatus(data.message);
                setIsLogin(prevState => !prevState);
                setTimeout(() => { setLoginPage(prevState => !prevState) }, 400);
                setYourname('');
                setRegisterPassword('');
                setRegisterUserName('');
                setPasswordChecker('');
            } else {
                setRegisterStatus(data.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setRegisterStatus('Something went wrong. Please try again.');
        }
    };

    const onLogin = async (event) => {
        event.preventDefault();
        if (!loginUserName) {
            return setLoginStatus('Please provide a valid username');
        }
        if (!loginPassword) {
            return setLoginStatus('Please provide a valid password');
        }

        setLoginStatus('Processing...');

        try {
            const userDetails = { username: loginUserName, password: loginPassword };
            const response = await fetch('https://quiz-backend-kytv.onrender.com/quiz/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userDetails })
            });
            const data = await response.json();
            if (response.ok) {
                setLoginStatus(data.message);
                setIsLogin(prev => !prev)
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 10); // Set expiration to 1 day from now
                setTimeout( () => {
                    cookies.set('jwt_token', data.jwt_token, { expires: expiryDate });
                    cookies.set('user_id', data.userId, { expires: expiryDate });
                    cookies.set('name', data.name, { expires: expiryDate });
                    window.location.href = '/'
                }, 300)
                setLoginUserName('');
                setLoginPassword('');
            } else {
                setLoginStatus(data.error_msg);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginStatus('Something went wrong. Please try again.');
        }
    };

    const handleLogin = () => {
        setIsLogin(prevState => !prevState);
        setLoginUserName('')
        setLoginPassword('')
        setYourname('')
        setRegisterUserName('')
        setRegisterPassword('')
        setPasswordChecker('')
        setRegisterShowLable(false)
        setLoginShowLable(false)
        setLoginStatus('')
        setRegisterStatus('')
        setTimeout(() => { setLoginPage(prevState => !prevState) }, 400);
    };

    const jwtToken = cookies.get('jwt_token');
    if(jwtToken !== undefined){
        return <Navigate to="/" />
    }

    return (
        <div className='registration-bg-container'>
            {!loginPage ?
                <div className='registration-main-container'>
                    <form className='registration-form' onSubmit={onRegister}>
                        <h1 className='registration'>Registration</h1>
                        <div className='user-details-container'>
                            <label htmlFor='yourname' className={`label ${registerShowLable.name ? 'lable-show' : ''}`}>Your name</label>
                            <div className='input-container'>
                                <input id='yourname' type='text' value={yourName}
                                    placeholder={registerShowLable.name ? '' : 'Your name'} className='input'
                                    onChange={event => setYourname(event.target.value)}
                                    onFocus={() => setRegisterShowLable(prevLable => ({ ...prevLable, name: true }))}
                                    onBlur={() => setRegisterShowLable(prevLable => ({ ...prevLable, name: yourName !== '' }))}
                                />
                                <MdOutlineDriveFileRenameOutline className='input-icons' />
                            </div>
                        </div>
                        <div className='user-details-container'>
                            <label htmlFor='register-username' className={`label ${registerShowLable.username ? 'lable-show' : ''}`}>Username</label>
                            <div className='input-container'>
                                <input id='register-username' type='text' value={registerUserName}
                                    placeholder={registerShowLable.username ? '' : 'Username'} className='input'
                                    onChange={event => setRegisterUserName(event.target.value)}
                                    onFocus={() => setRegisterShowLable(prevLable => ({ ...prevLable, username: true }))}
                                    onBlur={() => setRegisterShowLable(prevLable => ({ ...prevLable, username: registerUserName !== '' }))}
                                />
                                <FaUser className='input-icons' />
                            </div>
                        </div>
                        <div className='user-details-container'>
                            <label htmlFor='register-password' className={`label ${registerShowLable.password ? 'lable-show' : ''}`}>Password</label>
                            <div className='input-container'>
                                <input id='register-password' type={registerShowPassword ? 'text' : 'password'} value={registerPassword}
                                    placeholder={registerShowLable.password ? '' : 'Password'} className='input'
                                    onChange={handleRegisterPassword}
                                    onFocus={() => setRegisterShowLable(prevLable => ({ ...prevLable, password: true }))}
                                    onBlur={() => setRegisterShowLable(prevLable => ({ ...prevLable, password: registerPassword !== '' }))}
                                />
                                {!registerShowPassword ?
                                    <PiEyeClosedDuotone className='input-icons password' onClick={() => setRegisterShowPassword(true)} /> :
                                    <PiEyeDuotone className='input-icons password' onClick={() => setRegisterShowPassword(false)} />}
                            </div>
                        </div>{passwordChecker !== '' ? <p className='password-checker'>{passwordChecker}</p> : <p className='dummy-error'>'selva'</p>}
                        <button className='move-login-button' type='submit'>Register</button>
                        <p className='password-checker'>{registerStatus}</p>
                    </form>
                    <div className={`login-move-bg ${isLogin ? 'login-move-bg-active' : ''}`}>
                        <div className='move-login-container'>
                            <h2 className='welcome-message'>Welcome Back!</h2>
                            <p className='enquiry-text'>Already have an account?</p>
                            <button type='button' className='move-login-button'
                                onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
                :
                <div className='login-main-container'>
                    <div className={`register-move-bg ${isLogin ? 'register-move-bg-active' : ''}`}>
                        <div className='move-login-container'>
                            <h2 className='welcome-message'>Hello, Welcome!</h2>
                            <p className='enquiry-text'>Don't have an account?</p>
                            <button type='button' className='move-login-button'
                                onClick={handleLogin}>Register</button>
                        </div>
                    </div>
                    <form className='registration-form' onSubmit={onLogin}>
                        <h1 className='registration'>Login</h1>
                        <div className='user-details-container'>
                            <label htmlFor='login-username' className={`label ${loginShowLable.username ? 'lable-show' : ''}`}>Username</label>
                            <div className='input-container'>
                                <input id='login-username' type='text' value={loginUserName}
                                    placeholder={loginShowLable.username ? '' : 'Username'} className='input'
                                    onChange={event => setLoginUserName(event.target.value)}
                                    onFocus={() => setLoginShowLable(prevLable => ({ ...prevLable, username: true }))}
                                    onBlur={() => setLoginShowLable(prevLable => ({ ...prevLable, username: loginUserName !== '' }))}
                                />
                                <FaUser className='input-icons' />
                            </div>
                        </div>
                        <div className='user-details-container'>
                            <label htmlFor='login-password' className={`label ${loginShowLable.password ? 'lable-show' : ''}`}>Password</label>
                            <div className='input-container'>
                                <input id='login-password' type={loginShowPassword ? 'text' : 'password'} value={loginPassword}
                                    placeholder={loginShowLable.password ? '' : 'Password'} className='input'
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                    onFocus={() => setLoginShowLable(prevLable => ({ ...prevLable, password: true }))}
                                    onBlur={() => setLoginShowLable(prevLable => ({ ...prevLable, password: loginPassword !== '' }))}
                                />
                                {!loginShowPassword ?
                                    <PiEyeClosedDuotone className='input-icons password' onClick={() => setLoginShowPassword(true)} /> :
                                    <PiEyeDuotone className='input-icons password' onClick={() => setLoginShowPassword(false)} />}
                            </div>
                        </div>
                        <button className='move-login-button register' type='submit'>Login</button>
                        <p className='password-checker'>{loginStatus}</p>
                    </form>
                </div>}
        </div>
    );
};

export default Registration;