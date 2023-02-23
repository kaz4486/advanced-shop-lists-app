import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import ResponsiveMenu from 'react-responsive-navbar';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const Navbar = () => {
  const user = useSelector((state) => getUser(state));

  return (
    <ResponsiveMenu
      menuOpenButton={
        <div className={styles.button}>
          <p>open</p>
        </div>
      }
      menuCloseButton={
        <div className={styles.button}>
          <p>x</p>
        </div>
      }
      changeMenuOn='500px'
      largeMenuClassName={styles.large_menu_classname}
      smallMenuClassName={styles.small_menu_classname}
      menu={
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
              to='/'
            >
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
              to='/lists'
            >
              <span>Lists</span>
            </NavLink>
          </li>
          {user === null && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
                to='/register'
              >
                <span>Register</span>
              </NavLink>
            </li>
          )}
          {user !== null && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
                to='/logout'
              >
                <span>Logout</span>
              </NavLink>
            </li>
          )}
          {user === null && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
                to='/login'
              >
                <span>Login</span>
              </NavLink>
            </li>
          )}
        </ul>
      }
    />

    /* <nav> <Row>
        <Col xs={4}></Col>
        <Col xs={2}>
          <a href='/'>Home</a>
        </Col>
        <Col xs={2}>
          <a href={`/lists`}>Lists</a>
        </Col>
        <Col xs={2}>
          <a href='/register'>Register</a>
        </Col>
        {user !== null && (
          <Col xs={2}>
            <a href='/logout'>Logout</a>
          </Col>
        )}
        {user === null && (
          <Col xs={2}>
            <a href='/login'>Login</a>
          </Col>
        )}
      </Row>
    </nav> */
  );
};

export default Navbar;
