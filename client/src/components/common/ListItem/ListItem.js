import { Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListById } from '../../../redux/listsRedux';
import { Col, Row } from 'react-bootstrap';

const ListItem = ({ item, removeAction }) => {
  if (item)
    return (
      <Container key={item.name}>
        <Row>
          <Col xs={3}>
            <p>{item.name}</p>
          </Col>
          <Col xs={3}>
            <p>{item.amount}</p>
          </Col>
          <Col xs={3}>
            <p>{item.unit}</p>
          </Col>
          <Col xs={3}>
            <p>{item.volume}</p>
          </Col>
          {removeAction && (
            <Button onClick={() => removeAction(item.id)}></Button>
          )}
        </Row>
      </Container>
    );
};

export default ListItem;
