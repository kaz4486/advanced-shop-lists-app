import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLists,
  getRequest,
  loadListsRequest,
} from '../../../redux/listsRedux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert } from 'react-bootstrap';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(getLists);
  const request = useSelector(getRequest);

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
            {list.items.map((item) => (
              <div key={item.name}>
                <h1>{item.name}</h1>
              </div>
            ))}
          </div>
        ))}
      </Container>
    );
};

export default Lists;
