import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLists,
  getRequest,
  loadListsByUserRequest,
} from '../../../redux/listsRedux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert } from 'react-bootstrap';

import ListSummary from '../../common/ListSummary/ListSummary';
import { getUser } from '../../../redux/userRedux';
import styles from './Lists.module.scss';

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(getLists);
  const request = useSelector(getRequest);
  const user = useSelector(getUser);

  useEffect(() => {
    if (user !== null) {
      dispatch(loadListsByUserRequest(user));
    }
  }, [dispatch, user]);

  if (user === null) {
    return (
      <Alert color='info' className='text-center mb-0'>
        To see your lists you need to log in
      </Alert>
    );
  }

  if (request.pending)
    return (
      <Spinner className='mt-3 text-center' animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );

  if (!request.success)
    return (
      <Alert color='info' className='text-center mb-0'>
        Something went wrong...
      </Alert>
    );

  if (request.success && lists.length === 0) {
    return (
      <Alert color='info' className='text-center mb-0'>
        You don't have any saved lists
      </Alert>
    );
  }
  if (request.success)
    return (
      <section className={styles.lists}>
        <Container>
          {' '}
          <Row>
            {lists.map((list) => (
              <Col xs={6} sm={4} md={3} lg={2} key={list._id}>
                <div className={styles.list_summary} key={list._id}>
                  <ListSummary list={list} key={list._id} />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
};

export default Lists;
