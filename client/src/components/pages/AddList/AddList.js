import { useDispatch, useSelector } from 'react-redux';
import ListForm from '../../features/ListForm/ListForm';
import createPublicationDate from '../../../utils/createPublicationDate';
import { createListRequest } from '../../../redux/listsRedux';
import { useState } from 'react';
import { getItems } from '../../../redux/itemsRedux';
import { getUser } from '../../../redux/userRedux';

const AddList = () => {
  const dispatch = useDispatch();

  // const listName = null;

  const items = useSelector(getItems);
  const user = useSelector(getUser);

  const [submitedListName, setSubmitedListName] = useState(null);

  const [submitListNameError, setSubmitedListNameError] = useState(false);
  const [submitListItemError, setSubmitedListItemError] = useState(false);

  const handleListSubmit = (e) => {
    e.preventDefault();
    setSubmitedListItemError(false);
    setSubmitedListNameError(false);
    let listToCreate = {};

    const publicationDate = createPublicationDate();
    listToCreate.name = submitedListName;
    listToCreate.publicationDate = publicationDate;
    listToCreate.items = items;
    listToCreate.user = user;
    console.log(listToCreate);

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

    /// create new or print?
  };

  return (
    <div>
      <h1>Add list</h1>
      <ListForm
        submitedListName={submitedListName}
        submitListNameError={submitListNameError}
        submitListItemError={submitListItemError}
        setSubmitedListName={setSubmitedListName}
        setSubmitedListItemError={setSubmitedListItemError}
        setSubmitedListNameError={setSubmitedListNameError}
        handleListSubmit={handleListSubmit}
        items={items}
        user={user}
        buttonName='Add to my lists'
      />
    </div>
  );
};

export default AddList;
