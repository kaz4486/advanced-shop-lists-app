import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getItems,
  loadItems,
  removeAllItems,
  removeItem,
} from '../../../redux/itemsRedux';
import {
  createListRequest,
  getRequest,
  loadListsRequest,
} from '../../../redux/listsRedux';
import ItemBar from '../../common/ItemBar/ItemBar';
import ItemsForm from '../../common/ItemsForm/ItemsForm.tsx';
import { Alert } from 'react-bootstrap';
import SwitchSystem from '../SwitchSystem/SwitchSystem';
import ListNameForm from '../../common/ListNameForm/ListNameForm';
import ItemsList from '../../views/ItemsList/ItemsList';

import { useReactToPrint } from 'react-to-print';
import { getUser } from '../../../redux/userRedux';

const ListForm = ({
  submitedListName,
  submitListNameError,
  submitListItemError,
  setSubmitedListName,
  setSubmitedListItemError,
  setSubmitedListNameError,
  handleListSubmit,
  user,
  setItems,
  buttonName,
  items,
  id,
}) => {
  const dispatch = useDispatch();

  const request = useSelector(getRequest);
  // const user = useSelector(getUser);
  console.log(items);
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

  const handleResetList = () => {
    dispatch(removeAllItems());
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

            <button onClick={handlePrint}>Print list</button>
          </div>
        )}

        <ItemsForm
          system={system}
          setSubmitedListError={setSubmitedListItemError}
          // setItems={setItems}
          id={id}
        />
        <form onSubmit={(e) => handleListSubmit(e)}>
          <button type='submit' disabled={user !== null ? false : true}>
            {buttonName}
          </button>
        </form>
        <button type='button' onClick={handleResetList}>
          Reset list
        </button>
        {submitListNameError && <p>You need to add list name</p>}
        {submitListItemError && <p>You need to add at least 1 item</p>}
      </Container>
    );
};

export default ListForm;
