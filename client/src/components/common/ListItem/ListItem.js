import { Container, Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';

const ListItem = ({ item, removeAction }) => {
  console.log(removeAction);
  console.log(item);
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
