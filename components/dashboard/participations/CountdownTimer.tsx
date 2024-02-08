'use client'
import { useState, useEffect } from 'react';

const getNextMidnight = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
};

const countdownToMidnight = (): string => {
  const now = new Date();
  const midnight = getNextMidnight();
  const diff = midnight.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const CountdownTimer: React.FC = () => {
  const [timer, setTimer] = useState<string>('00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(countdownToMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p className="text-center min-w-[100px]">{timer}</p>;
};

export default CountdownTimer;
