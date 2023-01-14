import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListById } from '../../../redux/listsRedux';

const ListItem = ({ item }) => {
  console.log(item);
  return (
    <Container>
      <div>
        <div>{item.name}</div>
        <div>{item.amount}</div>
        {/* <div>{item.jedn}</div>
        <div>{item.obj}</div> */}
      </div>
    </Container>
  );
};

export default ListItem;
