import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';

function NavBar() {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={currentPage === '/' ? styles.active : ''}>
          <Link href="/">Home</Link>
        </li>
        <li className={currentPage.startsWith('/sp50') ? styles.active : ''}>
          <Link href="/sp50">Collection</Link>
        </li>
        <li className={currentPage === '/about' ? styles.active : ''}>
          <Link href="/about">About</Link>
        </li>
        <li>
          <a href="https://instagram.com">Instagram</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
