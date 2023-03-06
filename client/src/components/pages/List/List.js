import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import {
  getListById,
  getRequest,
  loadListsRequest,
  removeList,
  removeListRequest,
} from '../../../redux/listsRedux';
import Spinner from 'react-bootstrap/Spinner';
import { Alert, Row, Col, Container, Button, Modal } from 'react-bootstrap';
import ItemBar from '../../common/ItemBar/ItemBar';
import ListItem from '../../common/ListItem/ListItem';
import { getUser } from '../../../redux/userRedux';
import SmallButton from '../../common/SmallButton/SmallButton';
import styles from './List.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const List = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const list = useSelector((state) => getListById(state, id));
  const request = useSelector(getRequest);
  const user = useSelector(getUser);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch]);

  const handleRemoveList = () => {
    handleClose();
    setShowAlert(true);
    dispatch(removeListRequest(id, user));
    setTimeout(() => {
      navigate('/lists');
    }, 1500);
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
  if (showAlert)
    return <Alert color='info'>Your list was succesfuly removed</Alert>;
  if (request.success)
    return (
      <section className={styles.list}>
        <h2 className='mb-5'>{list.name}</h2>
        <ItemBar />
        {list.items.map((item) => (
          <ListItem item={item} key={item.name} />
        ))}

        <Row className='d-flex justify-content-center my-5'>
          <Col sm={6} className='d-flex justify-content-end'>
            {' '}
            <Link to={'/lists/edit/' + list._id}>
              <SmallButton>Edit</SmallButton>
            </Link>
          </Col>
          <Col sm={6} className='d-flex justify-content-start'>
            {' '}
            <SmallButton className='red' onClick={handleShow}>
              Delete
            </SmallButton>
          </Col>
        </Row>

        <Row className='d-flex justify-content-start'>
          <Col sm={2}>
            <Link to={'/lists/'}>
              <SmallButton>
                <FontAwesomeIcon
                  icon={faArrowCircleLeft}
                  className={styles.icon}
                />
                Back to lists
              </SmallButton>
            </Link>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleClose} className={styles.modal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This operation will completely remove this list from the app. Are
            you sure you want to do that?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='danger' onClick={handleRemoveList}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    );
};

export default List;
