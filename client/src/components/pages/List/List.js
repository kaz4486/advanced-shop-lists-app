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
      <div>
        <ItemBar />
        {list.items.map((item) => (
          <ListItem item={item} key={item.name} />
        ))}

        <Link to={'/lists/edit/' + list._id}>
          <Button>edit</Button>
        </Link>

        <Button onClick={handleShow}>remove</Button>

        <Modal show={showModal} onHide={handleClose}>
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
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};

export default List;
