import { Container, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

const Navbar = () => {
  const user = useSelector((state) => getUser(state));
  console.log(user);

  return (
    <nav>
      <Row>
        <Col xs={4}></Col>
        <Col xs={2}>
          <a href='/'>Home</a>
        </Col>
        <Col xs={2}>
          <a href='/lists'>Lists</a>
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
    </nav>
  );
};

export default Navbar;
