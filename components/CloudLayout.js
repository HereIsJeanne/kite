import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import NavBar from './NavBar';

function CloudLayout({ movementEnabled = false, firstItem = null, children }) {
  const isMobile = useMediaQuery({ maxWidth: 414 }); // Adjust the max width as per your needs
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

    if (movementEnabled && !isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (movementEnabled && !isMobile) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [movementEnabled, isMobile]);

  useEffect(() => {
    const moveBackground = () => {
      const speedFactor = 0.003;
      setMovement((prev) => ({
        x: prev.x - speedFactor * position.x,
        y: prev.y - speedFactor * position.y,
      }));
    };

    if (movementEnabled) {
      const interval = setInterval(moveBackground, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [movementEnabled, position]);

  const publicUrl = process.env.PUBLIC_URL || '';
  const backgroundImageUrl = `${publicUrl}/background-image.jpg`;

  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: `${movement.x}px ${movement.y}px`,
          backgroundSize: '2800px',
        }}
      >
        <NavBar firstItem={isMobile ? null : firstItem} />
        {children}
      </div>
    </>
  );
}

export default CloudLayout;
