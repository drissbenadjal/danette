import { createContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUser({});
    }

    const getUser = (token) => {
        fetch('https://danettenuitinfo.alwaysdata.net/v1/users/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                // console.log(data);
                setUser(data.user);
                setLoggedIn(true);
            } else {
                setErrorMessages(data);
                logout();
            }
            setIsLoading(false);
        })
        .catch(error => {
            // console.error(error);
            setErrorMessages(error);
            setIsLoading(false);
            logout();
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (email, password) => {
        return fetch('https://danettenuitinfo.alwaysdata.net/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              email: email,
              password: password
            })
        })
    }

    return (
        <AuthContext.Provider value={{ isLoading, loggedIn, user, login, logout, errorMessages, setLoggedIn, getUser }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthContext, AuthContextProvider };