import { useState, useEffect, useContext } from 'react';
import GameView from '../components/GameView/GameView';
import { AuthContext } from '../context/AuthContext';

const Game = () => {
  const { user, loggedIn, isLoading } = useContext(AuthContext);
  const [gameState, setGameState] = useState(0);


  useEffect(() => {
    if (user && loggedIn && !isLoading) {
      fetch("https://danettenuitinfo.alwaysdata.net/v1/game/getprogression", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.progression) {
            if (JSON.parse(data.progression).length > 0) {
              setGameState(2);
            } else {
              setGameState(1);
            }
          } else {
            console.log(data);
            setGameState(1);
          }
        })
        .catch((error) => {
          console.error(error);
          setGameState(1);
        });
    }
    console.log(user, loggedIn, isLoading);
    if (!loggedIn && !isLoading) {
      const savedProgress = localStorage.getItem("progress");
      if (savedProgress) {
        if (JSON.parse(savedProgress).length > 0) {
          setGameState(2);
        } else {
          setGameState(1);
        }
      } else {
        setGameState(1);
      }
    }
  }, [user, loggedIn, isLoading]);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return (
    <>
      {
        gameState === 1 && <div className="middle">
        <button className='primary' onClick={() => setGameState(3)}>Commencer une nouvelle partie</button>
        </div>
      }
      {
        gameState === 2 && <div className="middle"><button className='primary' onClick={() => setGameState(3)}>Continuer où je me suis arrêté</button></div>
      }
      {
        gameState === 3 && <GameView />
      }
    </>
  );
}

export default Game;