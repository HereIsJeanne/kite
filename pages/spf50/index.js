import { useEffect } from 'react';
import Link from 'next/link';
import { fetchSpf50Data } from '../../spf50Data';
import CloudLayout from '../../components/CloudLayout';
import styles from '../../styles/Spf50.module.css'; // Import the styles

function Spf50Index({ spf50Data }) {
  useEffect(() => {

    // Perform any necessary client-side initialization or effects
    // ...
  }, []);

  return (
    <CloudLayout>
      <div className={styles.scrollContainer}>
        <div className={styles.container}>
          {spf50Data.map((item) => (
            <Link href={`/spf50/${item.ID}`} key={item.ID}>
              <div className={styles.kite} style={{ backgroundImage: `url(${item.Image})` }} key={item.ID}></div>
            </Link>
          ))}
        </div>
      </div>
    </CloudLayout>
  );
}

export async function getStaticProps() {
  const spf50Data = await fetchSpf50Data();
  return {
    props: {
      spf50Data,
    },
  };
}

export default Spf50Index;

