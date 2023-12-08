import styles from './Leaderboard.module.scss';
import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    const getLeaderboard = async () => {
        try {
            const response = await fetch('https://danettenuitinfo.alwaysdata.net/v1/game/leaderboard');
            const data = await response.json();
            if (data.leaderboard) {
                setLeaderboard(data.leaderboard);
            }
        }
        catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <div className={styles.leaderboard}>
            <h1>Leaderboard</h1>
            <div className="leaderboard__user">
                <table>
                    <thead>
                        <tr>
                            <th># 👑</th>
                            <th>Pseudo</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderboard.length > 0 && leaderboard.slice(0, 10).map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.user_pseudo}</td>
                                        <td>{user.score}</td>
                                    </tr>

                                )
                            })
                        } </tbody>
                </table>
            </div>
            {
                leaderboard.length === 0 && <p>Pas encore de joueur!</p>
            }
        </div>
    );
}

export default Leaderboard;