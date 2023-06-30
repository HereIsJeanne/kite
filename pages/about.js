import CloudLayout from '../components/CloudLayout';
import styles from '../styles/About.module.css';
import { useMediaQuery } from 'react-responsive';


function AboutPage({ aboutData }) {
  const isMobile = useMediaQuery({ maxWidth: 414 }); // Adjust the max width as per your needs
  return (<>
    <div className={styles.aboutContainer}>
      {aboutData && <div dangerouslySetInnerHTML={{ __html: aboutData.AboutPageHTML }} />}
      {isMobile ? 
    <div className={styles.instagramContainer}>
      <a href="https://www.instagram.com/spf50.collection">Instagram</a>
    </div>
    : null
  }
    </div>
    
  </>);
}

export async function getStaticProps() {
  // Perform data retrieval on the server
  const res = await fetch('https://sheetdb.io/api/v1/dnuw839ldawjx');
  const data = await res.json();

  return {
    props: {
      aboutData: data[0],
    },
  };
}

export default function About({ aboutData }) {
  return (
    <CloudLayout>
      <AboutPage aboutData={aboutData} />
    </CloudLayout>
  );
}
