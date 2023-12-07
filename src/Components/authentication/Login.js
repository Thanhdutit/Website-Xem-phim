import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";

import axios from 'axios';
import './authen.css';
const LOGIN_URL = 'http://localhost:1001/login/local'
const Login = () => {
    const userRef = useRef();
    const errRef = useRef();    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:1001/login/local',
                { username:user, password:pwd },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const accessToken = response?.data?.accessToken;
            setUser('');
            setPwd('');
            setSuccess(true);
            if(accessToken!=undefined) localStorage.setItem('token',accessToken)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Không có phản hồi máy chủ');
            } else if (err.response?.status === 400) {
                setErrMsg('Tên người dùng hoặc mật khẩu trống');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                
                window.location.href = '/'
            ) : (
                <div className='authen'>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Đăng nhập</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Tên đăng nhập:</label>
                        <input
                            className='authen__input'
                            type="text"
                            id="username"
                             ref={userRef}
                             autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            className='authen__input'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='btn__authen'>Đăng nhập</button>
                    </form>
                    <p>
                        Tạo tạo khoản mới?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a className='authen__link-au' href="/dangky">Đăng ký</a>
                        </span>
                    </p>
                </section>
                </div>
            )}
        </>
    )
}

export default Login
