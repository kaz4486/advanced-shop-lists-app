import { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLists,
  getRequest,
  loadListsRequest,
} from '../../../redux/listsRedux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import ListSummary from '../../common/ListSummary';

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(getLists);
  const request = useSelector(getRequest);
  const navigate = useNavigate();

  console.log(lists);

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
  if (!lists) return <Navigate to='/' />;
  if (request.success)
    return (
      <Container>
        {lists.map((list) => (
          <div key={list._id}>
            <ListSummary list={list} />
          </div>
        ))}
      </Container>
    );
};

export default Lists;
