import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, loadItems, removeItem } from '../../../redux/itemsRedux';
import {
  createListRequest,
  getListById,
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

const AddListForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const request = useSelector(getRequest);

  const [system, setSystem] = useState('metric');
  const [submittedListName, setSubmittedListName] = useState(null);
  const [submitListError, setSubmittedListError] = useState(false);

  const handleSwitchSystem = () => {
    system === 'metric' ? setSystem('imperial') : setSystem('metric');
  };

  const handleItemRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch, items]);

  const handleListSubmit = () => {
    let listToCreate = new FormData();
    listToCreate.name = submittedListName;
    listToCreate.publicationDate = createPublicationDate();
    listToCreate.items = items;

    if (submittedListName && items.length !== 0) {
      setSubmittedListError(false);
      dispatch(createListRequest(listToCreate));
    } else {
      setSubmittedListError(true);
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
          subbmitedName={submittedListName}
          action={setSubmittedListName}
        />
        <SwitchSystem action={handleSwitchSystem} system={system} />
        <ItemBar />
        {items.length !== 0 && (
          <ItemsList items={items} removeItem={handleItemRemove} />
        )}
        <ItemsForm system={system} />
        <form onSubmit={handleListSubmit}>
          <button type='submit'>Create List</button>
        </form>
      </Container>
    );
};

export default AddListForm;
