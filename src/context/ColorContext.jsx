import { createContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const ColorContext = createContext();

const ColorContextProvider = ({ children }) => {
    const [theme, setTheme] = useState();

    const toggleTheme = () => {
        if (theme == 'light') {
            setTheme('dark')
        } else if (theme == 'dark') {
            setTheme('light')
        }
    }

    const setDarkTheme = () => {
        setTheme('dark')
    }

    const setLightTheme = () => {
        setTheme('light')
    }

    const setSystemTheme = () => {
        const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        setTheme(themeSystem)
    }

    const defaultTheme = () => {
        const themeLocalStorage = localStorage.getItem('theme')
        const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

        return (themeLocalStorage ?? themeSystem)
    }

    useEffect(() => {
        if (!theme) return setTheme(defaultTheme())

        document.querySelector(':root').dataset.theme = (theme)
        localStorage.setItem('theme', (theme))

        const useSetTheme = (e) => { setTheme(e.matches ? 'dark' : 'light') }
        const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)')

        watchSysTheme.addEventListener('change', useSetTheme)

        return () => {
            watchSysTheme.removeEventListener('change', useSetTheme)
        }
    }, [theme])

    useEffect(() => {
        // Exécutez votre script JavaScript ici, par exemple :
        const themeLocalStorage = localStorage.getItem('theme');
        const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.querySelector(':root').dataset.theme = themeLocalStorage ?? themeSystem;
    }, []);

    return (
        <ColorContext.Provider value={{ theme, toggleTheme, setDarkTheme, setLightTheme, setSystemTheme }}>
            {children}
        </ColorContext.Provider>
    );
}

ColorContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { ColorContext, ColorContextProvider };