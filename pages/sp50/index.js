import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchSp50Data } from '../../sp50Data';
import CloudLayout from '../../components/CloudLayout';

function Sp50Index({ sp50Data }) {
  const router = useRouter();

  useEffect(() => {
    // Perform any necessary client-side initialization or effects
    // ...
  }, []);

  return (
    <CloudLayout>
      <div>
        <h1>Sp50 Collection</h1>
        <ul>
          {sp50Data.map((item) => (
            <li key={item.ID}>
              <a
                href={`/sp50/${item.ID}`}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/sp50/${item.ID}`);
                }}
              >
                {item.Description}
              </a>
            </li>
          ))}
        </ul>
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
