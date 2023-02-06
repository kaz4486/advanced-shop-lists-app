import { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListByUser,
  getLists,
  getRequest,
  loadListsByUserRequest,
  loadListsRequest,
} from '../../../redux/listsRedux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert } from 'react-bootstrap';
// import { Navigate, useNavigate, Link } from 'react-router-dom';
import ListSummary from '../../common/ListSummary/ListSummary';
import { getUser } from '../../../redux/userRedux';

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(getLists);
  const request = useSelector(getRequest);
  const user = useSelector(getUser);
  // const lists = useSelector(getListByUser(user));
  // const navigate = useNavigate();

  console.log(lists);
  console.log(user);

  useEffect(() => {
    if (user !== null) {
      dispatch(loadListsByUserRequest(user));
    }
    // dispatch(loadListsRequest());
  }, [dispatch, user]);

  if (user === null) {
    return <Alert color='info'>To see your lists you need to log in</Alert>;
  }

  if (request.pending)
    return (
      <Spinner className='mt-3' animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );

  if (!request.success)
    return <Alert color='info'>Something went wrong...</Alert>;
  // if (lists.length === 0) return <Navigate to='/' />;
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
