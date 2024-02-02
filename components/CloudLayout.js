import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import NavBar from './NavBar';
import throttle from 'lodash/throttle'; 

function CloudLayout({ movementEnabled = false, firstItem = null, children }) {
  const isMobile = useMediaQuery({ maxWidth: 414 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [movement, setMovement] = useState({ x: 0, y: 0 });
  const [lazyBackgroundImage, setLazyBackgroundImage] = useState(null);
  const router = useRouter();
  const requestRef = useRef();
  const layoutRef = useRef();

  const updatePosition = (x, y) => {
    setPosition({ x, y });
  };

  const handleMouseMove = useCallback((event) => {
    const x = event.clientX - window.innerWidth / 2;
    const y = event.clientY - window.innerHeight / 2;
    requestRef.current = requestAnimationFrame(() => updatePosition(x, y));
  }, []);

  const throttledMouseMove = useCallback(throttle(handleMouseMove, 10), [handleMouseMove]);

  useEffect(() => {
    if (movementEnabled && !isMobile) {
      document.addEventListener('mousemove', throttledMouseMove);
      return () => {
        document.removeEventListener('mousemove', throttledMouseMove);
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [movementEnabled, isMobile, throttledMouseMove]);

  useEffect(() => {
    const moveBackground = () => {
      const speedFactor = 0.003;
      setMovement(prev => ({
        x: prev.x - speedFactor * position.x,
        y: prev.y - speedFactor * position.y,
      }));
    };

    const interval = setInterval(moveBackground, 10);
    return () => clearInterval(interval);
  }, [position]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !lazyBackgroundImage) {
          const publicUrl = process.env.PUBLIC_URL || '';
          setLazyBackgroundImage(`${publicUrl}/background-image.jpg`);
          observer.disconnect();
        }
      });
    });

    if (layoutRef.current) {
      observer.observe(layoutRef.current);
    }

    return () => observer.disconnect();
  }, [lazyBackgroundImage]);

  const backgroundStyle = useMemo(() => ({
    backgroundImage: lazyBackgroundImage ? `url(${lazyBackgroundImage})` : 'none',
    backgroundPosition: `${movement.x}px ${movement.y}px`,
    backgroundSize: '2800px',
  }), [movement, lazyBackgroundImage]);

  return (
    <>
      <div className="App" style={backgroundStyle} ref={layoutRef}>
        <NavBar firstItem={isMobile ? null : firstItem} />
        {children}
      </div>
    </>
  );
}

export default CloudLayout;
