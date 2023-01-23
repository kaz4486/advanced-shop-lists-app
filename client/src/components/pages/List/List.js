import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import {
  getListById,
  getRequest,
  loadListsRequest,
} from '../../../redux/listsRedux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert, Row, Col, Container } from 'react-bootstrap';
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
      </div>
    );
};

export default List;
