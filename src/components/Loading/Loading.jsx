// const loading component page

import React from 'react';
import styles from './Loading.module.scss';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState } from 'react';

const Loading = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { isLoading } = useContext(AuthContext);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if (isLoading) return;
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            setIsLoaded(true);
        }, 1000);
    }, [isLoading]);


    return (
        <>
            {
                isLoaded ? (
                    null
                ) : (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                    </div>
                )
            }
        </>
    );
}

export default Loading;