import { Col, Container, Row } from 'react-bootstrap';
import styles from './ListItem.module.scss';

const ListItem = ({ item, removeAction }) => {
  if (item)
    return (
      <Container>
        <div key={item.id} className={styles.list}>
          <Row className={styles.row}>
            <Col xs={0} sm={2} className={styles.hidden_column}></Col>
            <Col xs={6} sm={2}>
              <p>{item.name}</p>
            </Col>
            <Col xs={6} sm={2}>
              <p>{item.amount}</p>
            </Col>
            <Col xs={6} sm={2}>
              <p>{item.unit}</p>
            </Col>
            <Col xs={6} sm={2}>
              <p>{item.volume}</p>
            </Col>

            {removeAction && (
              <Col xs={6} sm={2}>
                <button onClick={() => removeAction(item.id)}>x</button>
              </Col>
            )}
            <Col xs={0} sm={2} className={styles.hidden_column}></Col>
          </Row>
        </div>
      </Container>
    );
};

export default ListItem;
