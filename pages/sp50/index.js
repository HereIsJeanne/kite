import { useEffect } from 'react';
import Link from 'next/link';
import { fetchSp50Data } from '../../sp50Data';
import CloudLayout from '../../components/CloudLayout';
import styles from '../../styles/Sp50.module.css'; // Import the styles

function Sp50Index({ sp50Data }) {

  useEffect(() => {
    // Perform any necessary client-side initialization or effects
    // ...
  }, []);

  return (
    <CloudLayout>
      <div className={styles.container}>
        {sp50Data.map((item) => (
          <Link href={`/sp50/${item.ID}`} key={item.ID}>
            <div className={styles.kite} style={{ backgroundImage: `url(${item.Image})` }}>
            </div>
          </Link>
        ))}
      </div>
    </CloudLayout>
  );
}

export async function getStaticProps() {
  const sp50Data = await fetchSp50Data();

  return {
    props: {
      sp50Data,
    },
  };
}

export default Sp50Index;
