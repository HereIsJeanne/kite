import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchSp50Data, fetchSp50Ids } from '../../sp50Data';
import CloudLayout from '../../components/CloudLayout';
import styles from '../../styles/Sp50Item.module.css'; // Remember to create this file

function Sp50Item({ item }) {
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

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <CloudLayout>
      <div className={styles.itemContainer}>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: item.Description }} />
        <img
          src={item.Image}
          alt="Item Image"
          className={styles.image}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        />
      </div>
    </CloudLayout>
  );
}

export async function getStaticPaths() {
  const ids = await fetchSp50Ids();

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
  const sp50Data = await fetchSp50Data();
  const item = sp50Data.find((item) => item.ID === id);

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

export default Sp50Item;
