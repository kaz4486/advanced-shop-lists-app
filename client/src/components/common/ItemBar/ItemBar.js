import { Col, Container, Row } from 'react-bootstrap';

const ItemBar = () => {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <h3>Name</h3>
        </Col>
        <Col xs={3}>
          <h3>Amount</h3>
        </Col>
        <Col xs={3}>
          <h3>Unit</h3>
        </Col>
        <Col xs={3}>
          <h3>Volume</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemBar;
