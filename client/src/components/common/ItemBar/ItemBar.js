import { Col, Container, Row } from 'react-bootstrap';
import styles from './ItemBar.module.scss';

const ItemBar = () => {
  return (
    <Container>
      <Row className={styles.bar}>
        {/* <div className={styles.bar}> */}
        <Col xs={1}></Col>

        <Col xs={2}>
          <h4>Name</h4>
        </Col>
        <Col xs={2}>
          <h4>Amount</h4>
        </Col>
        <Col xs={2}>
          <h4>Unit</h4>
        </Col>
        <Col xs={2}>
          <h4>Volume</h4>
        </Col>

        <Col xs={1}></Col>
        {/* </div> */}
      </Row>
    </Container>
  );
};

export default ItemBar;
