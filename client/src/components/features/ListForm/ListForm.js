import React, { useEffect, useRef, useState } from 'react';
import { Container, Modal, Spinner } from 'react-bootstrap';
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
        <ListNameForm
          subbmitedName={submitedListName}
          setSubmitedListName={setSubmitedListName}
          setSubmitedListNameError={setSubmitedListNameError}
        />
        <SwitchSystem action={handleSwitchSystem} system={system} />
        <ItemBar />
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

        <ItemsForm
          system={system}
          setSubmitedListError={setSubmitedListItemError}
          id={id}
        />
        <form onSubmit={(e) => handleListSubmit(e)}>
          <button type='submit' disabled={user !== null ? false : true}>
            {buttonName}
          </button>
        </form>
        <Button type='button' onClick={handleResetListItems}>
          Reset list
        </Button>
        {submitListNameError && <p>You need to add list name</p>}
        {submitListItemError && <p>You need to add at least 1 item</p>}

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your list was succesfully added</Modal.Title>
          </Modal.Header>
          <Modal.Body>What do you want to do now?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handlePrint}>
              Print that list
            </Button>
            <Button variant='danger' onClick={handleCreateNewList}>
              Add new list
            </Button>
            <Button variant='danger' onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
};

export default ListForm;
