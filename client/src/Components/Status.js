import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Story = ({ src, duration, onExpire }) => {
  const [isVisible, setIsVisible] = useState(true);
  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 500 },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onExpire) onExpire();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onExpire]);

  if (!isVisible) return null;

  return (
    <animated.div className="story" style={props}>
      <img src={src} alt="Story" style={{ width: '100%' }} />
    </animated.div>
  );
};

const Status = () => {
  const handleExpire = () => {
    console.log("Story expired");
  };

  return (
    <div>
      <Story
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/900px-Instagram_logo_2022.svg.png"
        duration={5000} 
        onExpire={handleExpire}
      />
    </div>
  );
};

export default Status;
