// StarBackground.js
import React, { useEffect } from 'react';
import './StarBackground.css'; // Import your CSS

const StarBackground = () => {
  useEffect(() => {
    const starBackground = document.querySelector('.star-background');

    function createStar() {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 5 + 5}s`; // Duration between 5s to 10s
      starBackground.appendChild(star);
    }

    for (let i = 0; i < 100; i++) {
      createStar();
    }
  }, []);

  return <div className="star-background"></div>;
};

export default StarBackground;
