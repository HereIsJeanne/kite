import { useEffect, useState } from 'react';
import { fetchSpf50Data, fetchSpf50Ids } from '../../spf50Data';
import CloudLayout from '../../components/CloudLayout';
import styles from '../../styles/Spf50Item.module.css';
import { useMediaQuery } from 'react-responsive';

function Spf50Item({ item }) {
  const [rotation, setRotation] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mediaQuery = useMediaQuery({ maxWidth: 414 });

  useEffect(() => {
    setIsMobile(mediaQuery);

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
  }, [isMobile, mediaQuery]);

  useEffect(() => {
    const descriptionTimer = setTimeout(() => {
      setShowDescription(true);
    }, 2000);

    return () => {
      clearTimeout(descriptionTimer);
    };
  }, []);

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

export async function getStaticPaths() {
  const ids = await fetchSpf50Ids();

  const paths = ids.map((id) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const spf50Data = await fetchSpf50Data();
  const item = spf50Data.find((item) => item.ID === id);

  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      item,
    },
  };
}

export default Spf50Item;
