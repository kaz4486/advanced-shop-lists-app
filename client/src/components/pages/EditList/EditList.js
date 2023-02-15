import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addItem,
  addItemsByList,
  getItems,
  loadItems,
  removeAllItems,
} from '../../../redux/itemsRedux';
import {
  editListRequest,
  getListById,
  getRequest,
  loadLists,
  loadListsByUserRequest,
  loadListsRequest,
} from '../../../redux/listsRedux';
import { getUser } from '../../../redux/userRedux';
import ListForm from '../../features/ListForm/ListForm';

const EditList = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const list = useSelector((state) => getListById(state, id));
  const user = useSelector(getUser);
  //   const items = list?.items;
  const items = useSelector(getItems);
  console.log(items);
  //   const request = useSelector(getRequest);

  //   const [items, setItems] = useState(list?.items);

  const [submitedListName, setSubmitedListName] = useState(list?.name);
  console.log(submitedListName);

  const [submitListNameError, setSubmitedListNameError] = useState(false);
  const [submitListItemError, setSubmitedListItemError] = useState(false);

  // const lists = useSelector(getListByUser(user));
  // const navigate = useNavigate();

  console.log(user);

  // useEffect(() => {
  //   if (user !== null) {
  //     dispatch(loadListsByUserRequest(user));
  //   }
  //   // dispatch(loadListsRequest());
  // }, [dispatch, user]);

  useEffect(() => {
    dispatch(loadLists);
  }, [dispatch, list]);

  useEffect(() => {
    list?.items.forEach((item) => dispatch(addItem({ ...item })));
    // return () => {
    //   dispatch(removeAllItems);
    // };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(removeAllItems);
    };
  });

  const handleListSubmit = (e) => {
    e.preventDefault();
    setSubmitedListItemError(false);
    setSubmitedListNameError(false);
    let listToEdit = {};

    listToEdit.name = submitedListName;

    console.log(items);

    listToEdit.items = items;
    listToEdit.user = user;
    console.log(listToEdit);

    if (submitedListName && items.length !== 0) {
      dispatch(editListRequest(listToEdit, id));
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

  //   if (request.pending)
  //     return (
  //       <Spinner className='mt-3' animation='border' role='status'>
  //         <span className='visually-hidden'>Loading...</span>
  //       </Spinner>
  //     );

  if (items === []) return <Alert color='info'>Something went wrong...</Alert>;

  //   if (request.success)
  return (
    <div>
      <h1>Edit list</h1>
      <ListForm
        submitedListName={submitedListName}
        submitListNameError={submitListNameError}
        submitListItemError={submitListItemError}
        setSubmitedListName={setSubmitedListName}
        setSubmitedListItemError={setSubmitedListItemError}
        setSubmitedListNameError={setSubmitedListNameError}
        handleListSubmit={handleListSubmit}
        items={items}
        // setItems={setItems}
        user={user}
        buttonName='Edit that list'
        id={id}
      />
    </div>
  );
};

export default EditList;
