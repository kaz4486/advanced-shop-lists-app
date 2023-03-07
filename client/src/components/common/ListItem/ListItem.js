import { Col, Row } from 'react-bootstrap';
import Button from '../Button/Button';
import SmallButton from '../SmallButton/SmallButton';
import styles from './ListItem.module.scss';

const ListItem = ({ item, removeAction }) => {
  if (item)
    return (
      <div key={item.id} className={styles.list}>
        <Row className={styles.row}>
          <Col xs={0} sm={1}></Col>
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
              <SmallButton onClick={() => removeAction(item.id)}>x</SmallButton>
            </Col>
          )}
          <Col xs={0} sm={1}></Col>
        </Row>
      </div>
    );
};

export default ListItem;
