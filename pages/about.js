import CloudLayout from '../components/CloudLayout';
import styles from '../styles/About.module.css';

function AboutPage({ aboutData }) {
  return (
    <div className={styles.aboutContainer}>
      {aboutData && <div dangerouslySetInnerHTML={{ __html: aboutData.AboutPageHTML }} />}
    </div>
  );
}

export async function getStaticProps() {
  // Perform data retrieval on the server
  const res = await fetch('https://sheetdb.io/api/v1/5uxyugigju92s');
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
