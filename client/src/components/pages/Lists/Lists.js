import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
import styles from './Lists.module.scss';

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(getLists);
  const request = useSelector(getRequest);
  const user = useSelector(getUser);
  // const lists = useSelector(getListByUser(user));
  // const navigate = useNavigate();

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
  if (request.success && lists.length === 0) {
    return <Alert color='info'>You don't have any saved lists</Alert>;
  }
  if (request.success)
    return (
      <section className={styles.lists}>
        <Container>
          <Row>
            {lists.map((list) => (
              <Col sm={6} md={3} lg={2} key={list._id}>
                {' '}
                <div className={styles.list_summary}>
                  <ListSummary list={list} />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
};

export default Lists;
