import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, removeItem } from '../../../redux/itemsRedux';
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
import createPublicationDate from '../../../utils/createPublicationDate';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const AddListForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const request = useSelector(getRequest);
  // const lists = useSelector(getLists);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [system, setSystem] = useState('metric');
  const [submitedListName, setSubmitedListName] = useState(null);

  const [submitListNameError, setSubmitedListNameError] = useState(false);
  const [submitListItemError, setSubmitedListItemError] = useState(false);

  // const [internalListId, setInternalListId] = useState('');

  const handleSwitchSystem = () => {
    system === 'metric' ? setSystem('imperial') : setSystem('metric');
  };

  const handleItemRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch]);

  // const createdList = useSelector((state) =>
  //   getListByInternalId(state, internalListId)
  // );
  // console.log(createdList);

  // const Print = (e) => {
  //   e.preventDefault();
  //   //console.log('print');
  //   let printContents = document.getElementById('printablediv').innerHTML;
  //   let originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   console.log(document.body.innerHTML);
  //   window.print();
  //   document.body.innerHTML = originalContents;
  //   console.log(document.body.innerHTML);
  // };

  const handleListSubmit = (e) => {
    e.preventDefault();
    // setInternalListId(nanoid());
    setSubmitedListItemError(false);
    setSubmitedListNameError(false);
    let listToCreate = {};

    const publicationDate = createPublicationDate();
    listToCreate.name = submitedListName;
    listToCreate.publicationDate = publicationDate;
    listToCreate.items = items;

    // listToCreate.internalId = internalListId;
    // console.log(listToCreate.internalId);

    if (submitedListName && items.length !== 0) {
      dispatch(createListRequest(listToCreate));
    } else if (!submitedListName && items.length !== 0) {
      setSubmitedListNameError(true);
    } else if (items.length === 0 && submitedListName) {
      setSubmitedListItemError(true);
    } else {
      setSubmitedListNameError(true);
      setSubmitedListItemError(true);
    }
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

        {/* <button type='button' onClick={(e) => Print(e)}>
          Print your list
        </button> */}
        <ItemsForm
          system={system}
          setSubmitedListError={setSubmitedListItemError}
        />
        <form onSubmit={(e) => handleListSubmit(e)}>
          <button type='submit'>Create List</button>
        </form>
        {submitListNameError && <p>You need to add list name</p>}
        {submitListItemError && <p>You need to add at least 1 item</p>}
      </Container>
    );
};

export default AddListForm;
