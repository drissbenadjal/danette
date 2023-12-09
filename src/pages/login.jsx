// import './Signin.scss';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const { login, setLoggedIn, loggedIn, isLoading } = useContext(AuthContext);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isLoading) return;
        if (loggedIn) {
            router.push('/game');
            return;
        };
    }, [isLoading, loggedIn]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }
        try {
            const response = await login(email, password);
            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                setLoggedIn(true);
                getUser();
                router.push('/game');
            } else {
                setError(data.error);
            }
        } catch (error) {
            // console.error(error);
            setError(error.error);
        }
    }

    return (
        <>
            <div className='login'>
                <form action="" className='signform' onSubmit={(e) => onSubmit(e)}>
                    <article>
                        <h2>Connectez-vous</h2>
                        <h5>Bienvenue à nouveau, veuillez vous connecter pour continuer.</h5>
                    </article>
                    <fieldset>
                        <label htmlFor="email">Email</label>
                        <input required type="email" className="form-control" id='email' name='email' placeholder="Entrez votre adresse mail..." />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Mot de passe</label>
                        <input required type="password" className="form-control" id='password' name='password' placeholder="Entrez votre mot de passe..." />
                        {/* <button>Forgot your password ?</button> */}
                    </fieldset>
                    {
                        error && <p className='error'>{error}</p>
                    }
                    <button type="submit" className="primary">Connexion</button>
                    <Link href='/signup'>Pas de compte ? Inscrivez-vous dès maintenant</Link>
                </form>
                    <article>
                        <h2>Continuer <br /> sans se connecter</h2>
                        <Link href='/game'>Ou continuer sans se connecter</Link>
                    </article>
            </div>

        </>
    )
}

export default Login;
