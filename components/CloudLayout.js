import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from './NavBar';

function CloudLayout({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [movement, setMovement] = useState({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX - window.innerWidth / 2,
        y: event.clientY - window.innerHeight / 2,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const moveBackground = () => {
      const speedFactor = 0.01; // Adjust as needed
      setMovement((prev) => ({
        x: prev.x - speedFactor * position.x,
        y: prev.y - speedFactor * position.y,
      }));
    };

    const interval = setInterval(moveBackground, 10); // Adjust as needed

    return () => {
      clearInterval(interval);
    };
  }, [position]);

  const publicUrl = process.env.PUBLIC_URL || '';
  const backgroundImageUrl = `${publicUrl}/background-image.jpg`;

  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: `${movement.x}px ${movement.y}px`,
          backgroundSize: '200%', // Adjust as needed
        }}
      >
        <NavBar />
        {children}
      </div>
    </>
  );
}

export default CloudLayout;
