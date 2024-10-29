import { useEffect, useState } from 'react';

const Timer = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const timeDiff = Math.floor((now - startTime) / 1000); 
      setElapsedTime(timeDiff);
    }, 1000);

    return () => clearInterval(intervalId); //cleanup the interval on component unmount
  }, [startTime]);


  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    
    const seconds = Math.floor(time % 60);
    return `${hours}h ${minutes}m ${seconds}s`; 
  };

  return <span>{formatTime(elapsedTime)}</span>; 
};

export default Timer;
