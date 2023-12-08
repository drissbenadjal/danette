import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import s from "./Island.module.scss"

export const Island = ({ level }) => {
  const [sceneSize, setSceneSize] = useState({ width: 0, height: 0 });
  const splineRef = useRef(null);
  const [isLoading3D, setIsLoading3D] = useState(true);

  useEffect(() => {
    console.log(level)
    if (level === 1) {
      //chiffre 1
      var event = new KeyboardEvent('keydown', {
        key: '1',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 2) {
      //chiffre 2
      var event = new KeyboardEvent('keydown', {
        key: '2',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 3) {
      //chiffre 3
      var event = new KeyboardEvent('keydown', {
        key: '3',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 4) {
      //chiffre 4
      var event = new KeyboardEvent('keydown', {
        key: '4',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 5) {
      //chiffre 5
      var event = new KeyboardEvent('keydown', {
        key: '5',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 6) {
      //chiffre 6
      var event = new KeyboardEvent('keydown', {
        key: '6',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 7) {
      //chiffre 7
      var event = new KeyboardEvent('keydown', {
        key: '6',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 8) {
      //chiffre 8
      var event = new KeyboardEvent('keydown', {
        key: '7',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
  }, [level])

  const onLoad = (spline) => {

    setTimeout(() => {
      setIsLoading3D(false);
    }, 500);

    console.log("Spline Up")
    if (level === 1) {
      //chiffre 1
      var event = new KeyboardEvent('keydown', {
        key: '1',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 2) {
      //chiffre 2
      var event = new KeyboardEvent('keydown', {
        key: '2',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 3) {
      //chiffre 3
      var event = new KeyboardEvent('keydown', {
        key: '3',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 4) {
      //chiffre 4
      var event = new KeyboardEvent('keydown', {
        key: '4',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 5) {
      //chiffre 5
      var event = new KeyboardEvent('keydown', {
        key: '5',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 6) {
      //chiffre 6
      var event = new KeyboardEvent('keydown', {
        key: '6',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 7) {
      //chiffre 7
      var event = new KeyboardEvent('keydown', {
        key: '6',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
    if (level === 8) {
      //chiffre 8
      var event = new KeyboardEvent('keydown', {
        key: '7',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (splineRef.current) {
        const { clientWidth, clientHeight } = splineRef.current;

        // Mettre à jour la taille de la scène
        setSceneSize({ width: clientWidth, height: clientHeight });
      }
    };

    // Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
    window.addEventListener('resize', handleResize);

    // Appeler la fonction de redimensionnement au chargement initial
    handleResize();

    // Retirer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {
        isLoading3D && <div className="loadinggame">
          <div className='spinner'></div>
        </div>
      }
      <Spline
        className={s.Island}
        scene="./assets/scenes/island.splinecode"
        onLoad={onLoad}
        width={sceneSize.width}
        height={sceneSize.height}
      />
    </>

  );

}