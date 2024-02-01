import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import NavBar from './NavBar';

function CloudLayout({ movementEnabled = false, firstItem = null, children }) {
    const isMobile = useMediaQuery({ maxWidth: 414 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [movement, setMovement] = useState({ x: 0, y: 0 });
    const router = useRouter();

    // Define publicUrl
    const publicUrl = process.env.PUBLIC_URL || '';

    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };

    const handleMouseMove = useCallback((event) => {
        setPosition({
            x: event.clientX - window.innerWidth / 2,
            y: event.clientY - window.innerHeight / 2,
        });
    }, []);

    const throttledMouseMove = useCallback(throttle(handleMouseMove, 100), []);

    useEffect(() => {
        if (movementEnabled && !isMobile) {
            document.addEventListener('mousemove', throttledMouseMove);
        }

        return () => {
            if (movementEnabled && !isMobile) {
                document.removeEventListener('mousemove', throttledMouseMove);
            }
        };
    }, [movementEnabled, isMobile, throttledMouseMove]);

    useEffect(() => {
        const moveBackground = () => {
            const speedFactor = 0.003;
            setMovement((prev) => ({
                x: prev.x - speedFactor * position.x,
                y: prev.y - speedFactor * position.y,
            }));
        };

        if (movementEnabled) {
            const interval = setInterval(moveBackground, 50); // Adjusted to 50ms

            return () => {
                clearInterval(interval);
            };
        }
    }, [movementEnabled, position]);

    const backgroundImageStyle = useMemo(() => ({
        backgroundImage: `url(${publicUrl}/background-image-lighter.jpg)`,
        backgroundPosition: `${movement.x}px ${movement.y}px`,
        backgroundSize: '2800px',
    }), [movement, publicUrl]);

    return (
        <>
            <div className="App" style={backgroundImageStyle}>
                <NavBar firstItem={isMobile ? null : firstItem} />
                {children}
            </div>
        </>
    );
}

export default CloudLayout;
