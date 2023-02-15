import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  getListById,
  getRequest,
  loadListsRequest,
  removeList,
} from '../../../redux/listsRedux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert, Row, Col, Container, Button } from 'react-bootstrap';
import ItemBar from '../../common/ItemBar/ItemBar';
import ListItem from '../../common/ListItem/ListItem';

const List = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const list = useSelector((state) => getListById(state, id));
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch]);

  const handleRemoveList = (list) => {
    dispatch(removeList(list));
  };

  if (request.pending)
    return (
      <Spinner className='mt-3' animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  if (request.error) return <Alert color='warning'>{request.error}</Alert>;
  if (!request.success)
    return <Alert color='info'>Something went wrong...</Alert>;
  if (!list) return <Navigate to='/' />;
  if (request.success)
    return (
      <div>
        <ItemBar />
        {list.items.map((item) => (
          <ListItem item={item} key={item.name} />
        ))}

        <Link to={'/lists/edit/' + list._id}>
          <Button>edit</Button>
        </Link>

        <Button onClick={() => handleRemoveList(list)}>remove</Button>
      </div>
    );
};

export default List;
