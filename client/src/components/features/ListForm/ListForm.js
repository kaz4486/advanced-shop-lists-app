import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadItems,
  removeAllItems,
  removeItem,
} from '../../../redux/itemsRedux';
import { getRequest, loadListsRequest } from '../../../redux/listsRedux';
import ItemBar from '../../common/ItemBar/ItemBar';
import ItemsForm from '../../common/ItemsForm/ItemsForm.tsx';
import { Alert } from 'react-bootstrap';
import SwitchSystem from '../SwitchSystem/SwitchSystem';
import ListNameForm from '../../common/ListNameForm/ListNameForm';
import ItemsList from '../../views/ItemsList/ItemsList';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import styles from './ListForm.module.scss';

const ListForm = ({
  submitedListName,
  submitListNameError,
  submitListItemError,
  setSubmitedListName,
  setSubmitedListItemError,
  setSubmitedListNameError,
  handleListSubmit,
  user,
  buttonName,
  items,
  id,
  showModal,
  handleClose,
}) => {
  const dispatch = useDispatch();

  console.log(items);

  const request = useSelector(getRequest);
  // const user = useSelector(getUser);

  const navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [system, setSystem] = useState('metric');

  const handleSwitchSystem = () => {
    system === 'metric' ? setSystem('imperial') : setSystem('metric');
  };

  const handleItemRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  useEffect(() => {
    dispatch(loadListsRequest());
    dispatch(loadItems);
  }, [dispatch]);

  const handleResetListItems = () => {
    dispatch(removeAllItems());
  };

  useEffect(() => {
    return () => {
      dispatch(removeAllItems());
    };
  }, []);

  const handleCreateNewList = () => {
    handleResetListItems();
    setSubmitedListName('');
    handleClose();
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
  if (request.success)
    return (
      <Container>
        <section>
          <ListNameForm
            subbmitedName={submitedListName}
            setSubmitedListName={setSubmitedListName}
            setSubmitedListNameError={setSubmitedListNameError}
          />
        </section>
        <section>
          <SwitchSystem action={handleSwitchSystem} system={system} />
        </section>
        <section>
          {/* {items.length !== 0 && <ItemBar />} */}
          {items.length !== 0 && (
            <div>
              <ItemsList
                ref={componentRef}
                items={items}
                removeItem={handleItemRemove}
              />

              <Button onClick={handlePrint}>Print list</Button>
            </div>
          )}
        </section>
        <section>
          <ItemsForm
            system={system}
            setSubmitedListError={setSubmitedListItemError}
            id={id}
          />
          <Row>
            <Col xs={12} sm={6}>
              {' '}
              <form onSubmit={(e) => handleListSubmit(e)}>
                <Button type='submit' disabled={user !== null ? false : true}>
                  {buttonName}
                </Button>
              </form>
            </Col>
            <Col xs={12} sm={6}>
              {' '}
              <Button
                type='button'
                onClick={handleResetListItems}
                className='red'
              >
                Reset list
              </Button>
            </Col>
          </Row>
          {submitListNameError && <p>You need to add list name</p>}
          {submitListItemError && <p>You need to add at least 1 item</p>}
        </section>

        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop='static'
          size='lg'
        >
          <Modal.Header closeButton className='d-flex justify-content-center'>
            <Modal.Title>Your list was succesfully added</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex justify-content-center'>
            What do you want to do now?
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-center'>
            <Row>
              <Col xs={12} md={4}>
                <Button variant='secondary' onClick={handlePrint}>
                  Print that list
                </Button>
              </Col>

              <Col xs={12} md={4}>
                <Button variant='danger' onClick={handleCreateNewList}>
                  Add new list
                </Button>
              </Col>

              <Col xs={12} md={4}>
                <Button variant='danger' onClick={() => navigate('/')}>
                  Back to Home
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </Container>
    );
};

export default ListForm;
