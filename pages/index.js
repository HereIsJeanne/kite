import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchSpf50Data } from '../spf50Data';
import CloudLayout from '../components/CloudLayout';
import styles from '../styles/Spf50Item.module.css';
import { useMediaQuery } from 'react-responsive';

function HomePage() {
  
  const isMobile = useMediaQuery({ maxWidth: 414 });
  const [spf50Data, setSpf50Data] = useState([]);
  const [selectedKiteIndex, setSelectedKiteIndex] = useState(null); // set initial value to null
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchSpf50DataAsync = async () => {
      try {
        const data = await fetchSpf50Data();
        const randomIndex = Math.floor(Math.random() * data.length); // generate a random index
        setSelectedKiteIndex(randomIndex); // set the random index
        setSpf50Data(data);
      } catch (error) {
        console.error('Error fetching Spf50 data:', error);
      }
    };

    fetchSpf50DataAsync();
  }, []);

  const handleImageClick = () => {
    setSelectedKiteIndex((prevIndex) => {
      const nextIndex = prevIndex === spf50Data.length - 1 ? 0 : prevIndex + 1;
      return nextIndex;
    });
  };

  useEffect(() => {
    const descriptionTimer = setTimeout(() => {
      setShowDescription(true);
    }, 2000);

    return () => {
      clearTimeout(descriptionTimer);
    };
  }, []);

  return (
    <>
      {spf50Data.length > 0 && selectedKiteIndex !== null && ( // ensure spf50Data is loaded and selectedKiteIndex is not null
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

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const offsetX = clientX - innerWidth / 2;
      const offsetY = innerHeight / 2 - clientY;
      const rotationValue = (Math.atan2(offsetX, offsetY) * 180) / Math.PI;
      setRotation(rotationValue);
    };

    if (!isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (!isMobile) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

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
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
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
