import Navbar from '../../views/Navbar/Navbar';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <section className={styles.header}>
      <Navbar />
    </section>
  );
};

export default Header;
