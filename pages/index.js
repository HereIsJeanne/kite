import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { fetchSpf50Data } from '../spf50Data';
import CloudLayout from '../components/CloudLayout';
import styles from '../styles/Spf50Item.module.css';
import { useMediaQuery } from 'react-responsive';

function HomePage() {
    const isMobile = useMediaQuery({ maxWidth: 414 });
    const [spf50Data, setSpf50Data] = useState([]);
    const [selectedKiteIndex, setSelectedKiteIndex] = useState(null);
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        const fetchSpf50DataAsync = async () => {
            try {
                const data = await fetchSpf50Data();
                setSelectedKiteIndex(Math.floor(Math.random() * data.length));
                setSpf50Data(data);
            } catch (error) {
                console.error('Error fetching Spf50 data:', error);
            }
        };

        fetchSpf50DataAsync();
    }, []);

    const handleImageClick = useCallback(() => {
        setSelectedKiteIndex(prevIndex => (prevIndex === spf50Data.length - 1 ? 0 : prevIndex + 1));
    }, [spf50Data.length]);

    useEffect(() => {
        const descriptionTimer = setTimeout(() => setShowDescription(true), 2000);
        return () => clearTimeout(descriptionTimer);
    }, []);

    return (
        <>
            {spf50Data.length > 0 && selectedKiteIndex !== null && (
                <Spf50Item
                    item={spf50Data[selectedKiteIndex]}
                    onImageClick={handleImageClick}
                    showDescription={showDescription}
                    isMobile={isMobile}
                />
            )}
        </>
    );
}

function Spf50Item({ item, onImageClick, showDescription, isMobile }) {
    const [rotation, setRotation] = useState(0);

    const handleMouseMove = useCallback((event) => {
        if (!isMobile) {
            const offsetX = event.clientX - window.innerWidth / 2;
            const offsetY = window.innerHeight / 2 - event.clientY;
            setRotation((Math.atan2(offsetX, offsetY) * 180) / Math.PI);
        }
    }, [isMobile]);

    useEffect(() => {
        if (!isMobile) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isMobile, handleMouseMove]);

    const imageStyle = useMemo(() => ({
        transform: `rotate(${rotation}deg)`,
    }), [rotation]);

    return (
        <CloudLayout movementEnabled={!isMobile} firstItem={item.Name}>
            <div className={styles.pageContainer}>
                {!isMobile && (
                    <div className={styles.descriptionContainer}>
                        <div
                            className={`${styles.description} ${showDescription ? styles.show : ''}`}
                            dangerouslySetInnerHTML={{ __html: item.Description }}
                        />
                    </div>
                )}
                <div className={styles.itemContainer}>
                    <img
                        src={item.Image}
                        alt="Item Image"
                        className={styles.image}
                        style={imageStyle}
                        onClick={onImageClick}
                    />
                    {isMobile && (
                        <div className={styles.descriptionContainer}>
                            <div
                                className={`${styles.description} ${showDescription ? styles.show : ''}`}
                                dangerouslySetInnerHTML={{ __html: item.Description }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </CloudLayout>
    );
}

export default HomePage;
