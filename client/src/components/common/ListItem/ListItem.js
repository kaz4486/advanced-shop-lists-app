import { Col, Row } from 'react-bootstrap';
import Button from '../Button/Button';
import SmallButton from '../SmallButton/SmallButton';

const ListItem = ({ item, removeAction }) => {
  if (item)
    return (
      <div key={item.id}>
        <Row>
          <Col sm={1}></Col>
          <Col sm={2}>
            <p>{item.name}</p>
          </Col>
          <Col sm={2}>
            <p>{item.amount}</p>
          </Col>
          <Col sm={2}>
            <p>{item.unit}</p>
          </Col>
          <Col sm={2}>
            <p>{item.volume}</p>
          </Col>

          {removeAction && (
            <Col sm={2}>
              <SmallButton onClick={() => removeAction(item.id)}>x</SmallButton>
            </Col>
          )}
          <Col sm={1}></Col>
        </Row>
      </div>
    );
};

export default ListItem;
