import { Container, Col, Row } from 'react-bootstrap';

const Navbar = () => {
  return (
    <nav>
      <Row>
        <Col xs={6}></Col>
        <Col xs={2}>
          <a href='/'>Home</a>
        </Col>
        <Col xs={2}>
          <a href='/lists'>Lists</a>
        </Col>
        <Col xs={2}>
          <a href='/register'>Register</a>
        </Col>
      </Row>
    </nav>
  );
};

export default Navbar;
