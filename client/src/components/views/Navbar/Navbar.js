import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import ResponsiveMenu from 'react-responsive-navbar';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const user = useSelector((state) => getUser(state));

  return (
    <ResponsiveMenu
      menuOpenButton={
        <div>
          <p>open</p>
        </div>
      }
      menuCloseButton={
        <div>
          <p>x</p>
        </div>
      }
      changeMenuOn='500px'
      largeMenuClassName={styles.large_menu_classname}
      smallMenuClassName='small-menu-classname'
      menu={
        <ul>
          <li>
            {' '}
            <a href='/'>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href='/lists'>
              <span>Lists</span>
            </a>
          </li>
          {user === null && (
            <li>
              {' '}
              <a href='/register'>
                <span>Register</span>
              </a>
            </li>
          )}
          {user !== null && (
            <li>
              {' '}
              <a href='/logout'>
                <span>Logout</span>
              </a>
            </li>
          )}
          {user === null && (
            <li>
              {' '}
              <a href='/login'>
                <span>Login</span>
              </a>
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
