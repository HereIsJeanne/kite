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
            <Link href="/">HOME</Link>
          </li>
          <li></li> {/* Empty list item */}
          <li className={currentPage.startsWith('/sp50') ? styles.active : ''}>
            <Link href="/sp50">SP50 COLLECTION</Link>
          </li>
          <li className={currentPage === '/about' ? styles.active : ''}>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <a href="https://instagram.com">INSTAGRAM</a>
          </li>
        </ul>
      </nav>
    );
  }
  
  

export default NavBar;
