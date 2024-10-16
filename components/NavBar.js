
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';
import { MdClose, MdInfoOutline } from 'react-icons/md';

function NavBar({ firstItem }) {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <>
      <nav className={`${styles.navBar} ${styles.mobile}`}>
        <ul className={styles.navList}>
          <li>SPF50 COLLECTION</li>
          <li>{currentPage === '/about' ? <Link href="/"><MdClose /></Link> : <Link href="/about"><MdInfoOutline /></Link>}</li>
        </ul>
      </nav>
      
      <nav className={`${styles.navBar} ${styles.desktop}`}>
        <ul className={`${styles.navList} ${styles.navListDesktop}`}>
          <li>{firstItem ? <span className={styles.left}>{firstItem}</span> : <Link className={styles.left} href="/">FLIGHT MODE</Link>}</li>
          <li><Link className={styles.center} id="center" href="/spf50">SPF50 COLLECTION</Link></li>
          <li>  <Link href="/about" className={styles.right}>ABOUT</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
