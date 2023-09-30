import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header'


const Login = () => {

    const { login, setAuth } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, pwd);
            const accessToken = response?.acces_token;
            localStorage.setItem('accessToken', accessToken);
            setAuth(email, pwd)
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sunucuya Bağlanılamadı.');
            } else if (err.response?.status === 400) {
                setErrMsg('Kullanıcı adı veya parola yanlış.');
            } else if (err.response?.status === 401) {
                setErrMsg('Kullanıcı adı veya parola yanlış.');
            }else if (err.response?.status === 404){
                setErrMsg('Kullanıcı Bulunamadı.');
            } 
            else {
                setErrMsg('Giriş Yapılamadı.');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <Header />
            <div className='page-divider'></div>
                <section className='loginpage'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">E-Posta:</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Şifre:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Giriş Yap</button>
                    </form>
                    <p className='link-section'>
                        Hesabınız yok mu?<br />
                        <span className="line" onClick={()=>navigate('/register')}>
                            Kayıt Ol
                        </span>
                    </p>
                </section>
        </>
    )
}

export default Login