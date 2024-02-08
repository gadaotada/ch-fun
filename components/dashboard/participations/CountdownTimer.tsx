import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetDate: Date;
  }
  
  const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
    const [timer, setTimer] = useState<string>('00:00:00');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(countdownToMidnight(targetDate));
      }, 1000);
  
      return () => clearInterval(interval);
    }, [targetDate]);
  
    return <p className="text-center min-w-[100px]">{timer}</p>;
  };
  
  const countdownToMidnight = (targetDate: Date): string => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), targetDate.getDate() + 1);
    const diff = midnight.getTime() - now.getTime();
  
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  export default CountdownTimer;