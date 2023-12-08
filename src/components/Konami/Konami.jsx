// components/KonamiCode.js
import { useEffect, useState } from 'react';

const KonamiCode = () => {
  const [current, setCurrent] = useState(0);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const keyHandler = (event) => {
    // Si la touche n'est pas dans la séquence Konami, ou si elle n'est pas la touche actuelle dans la séquence, réinitialisation.
    if (konamiCode.indexOf(event.key) < 0 || event.key !== konamiCode[current]) {
      setCurrent(0);
      return;
    }

    // Mise à jour de la partie de la séquence qui est terminée
    setCurrent(current + 1);

    // Si la séquence est complète, alerte et réinitialisation
    if (konamiCode.length === current + 1) {
      setCurrent(0);
      window.open('https://www.youtube.com/watch?v=QwLyscT3NgI', '_blank');
    }
  };

  useEffect(() => {
    // Vérifier si le code s'exécute du côté client avant d'ajouter l'écouteur d'événement
    if (typeof window !== 'undefined') {
      // Écouter les événements liés à l'enfoncement des touches
      document.addEventListener('keydown', keyHandler, false);

      // Nettoyer l'écouteur d'événement lorsque le composant est démonté
      return () => {
        document.removeEventListener('keydown', keyHandler, false);
      };
    }
  }, [current]);

  return null; // Ce composant ne rend rien, il est simplement utilisé pour gérer le code Konami.
};

export default KonamiCode;
