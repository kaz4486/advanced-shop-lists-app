import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
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

const AddListForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const request = useSelector(getRequest);
  console.log(items);

  const [system, setSystem] = useState('metric');
  const [submitedListName, setSubmitedListName] = useState(null);

  const [submitListNameError, setSubmitedListNameError] = useState(false);
  const [submitListItemError, setSubmitedListItemError] = useState(false);

  const handleSwitchSystem = () => {
    system === 'metric' ? setSystem('imperial') : setSystem('metric');
  };

  const handleItemRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch, items]);

  const handleListSubmit = (e) => {
    setSubmitedListItemError(false);
    setSubmitedListNameError(false);
    e.preventDefault();
    let listToCreate = {};
    // listToCreate.name = submitedListName;
    const publicationDate = createPublicationDate();
    // listToCreate.items = items;

    listToCreate.name = submitedListName;
    listToCreate.publicationDate = publicationDate;
    listToCreate.items = items;

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
          <ItemsList items={items} removeItem={handleItemRemove} />
        )}
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
