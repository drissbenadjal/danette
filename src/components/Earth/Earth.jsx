import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

import styles from './Earth.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Earth = () => {
  const [sceneSize, setSceneSize] = useState({ width: 0, height: 0 });
  const splineRef = useRef(null);

  const onLoad = (spline) => {
    // console.log('Spline chargé', spline);


    const earthObject = spline?.findObjectByName('Earth');
   
    if (earthObject) {
      gsap.to(earthObject.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        ease: 'power1.inOut',
      });

      gsap.to(earthObject.rotation, {
        y: 0,
        x: -0.5,
        ease: 'power1.inOut',
      });

      gsap.to(earthObject.position, {
        x: 0,
        y: -200,
        z: 10,
        ease: 'power1.inOut',
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: ' center',
          end: 'bottom center',
          scrub: true,
        },
      }).to(earthObject.scale, {
        x: 1,
        y: 1,
        z: 1,
        ease: 'power1.inOut',
      }).to(earthObject.position, {
        x: 300,
        y: 0,
        z: 0,
        ease: 'power1.inOut',
      }, 0).to(earthObject.rotation, {
        y: -0.5,
        x: 0,
        ease: 'power1.inOut',
      }, 0);
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: '#how',
        start: ' center',
        end: 'bottom center',
        scrub: true,
        smoothChildTiming: true,
      },
    }).to(earthObject.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      ease: 'power1.inOut',
    }).to(earthObject.position, {
      x: 200,
      y: 0,
      z: 0,
      ease: 'power1.inOut',
    }, 0).to(earthObject.rotation, {
      y: 0,
      x: 0,
      ease: 'power1.inOut',
    }, 0);


    const handleResize = () => {
      // console.log('resize');
      // console.log(spline._viewportWidth);
      const clientWidth = window.innerWidth;
      const clientHeight = window.innerHeight;

      // Mettre à jour la taille de la scène
      spline._viewportWidth = clientWidth;
      spline._viewportHeight = clientHeight;
    };

    window.addEventListener('resize', handleResize);


  };

  return (
    <Spline
      className={styles.earth}
      scene="./assets/scenes/earth.splinecode"
      onLoad={onLoad}
      width={sceneSize.width}
      height={sceneSize.height}
    />

  );
};

export default Earth;
