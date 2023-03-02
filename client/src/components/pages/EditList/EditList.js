import { useEffect, useState } from 'react';
import { Alert, Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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
import SmallButton from '../../common/SmallButton/SmallButton';
import ListForm from '../../features/ListForm/ListForm';
import styles from './EditList.module.scss';

const EditList = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const list = useSelector((state) => getListById(state, id));
  const user = useSelector(getUser);
  //   const items = list?.items;
  const items = useSelector(getItems);
  const request = useSelector(getRequest);
  console.log('list', list);
  console.log('list items', list?.items);
  console.log('items', items);

  //   const request = useSelector(getRequest);

  //   const [items, setItems] = useState(list?.items);

  const [submitedListName, setSubmitedListName] = useState(list?.name);

  const [submitListNameError, setSubmitedListNameError] = useState(false);
  const [submitListItemError, setSubmitedListItemError] = useState(false);

  // const lists = useSelector(getListByUser(user));
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user !== null) {
  //     dispatch(loadListsByUserRequest(user));
  //   }
  //   // dispatch(loadListsRequest());
  // }, [dispatch, user]);

  useEffect(() => {
    dispatch(loadListsRequest());
  }, []);

  useEffect(() => {
    list?.items.forEach((item) => dispatch(addItem({ ...item })));
  }, [list?.items]);

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

    listToEdit.items = items;
    listToEdit.user = user;

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
  };

  //   if (request.pending)
  //     return (
  //       <Spinner className='mt-3' animation='border' role='status'>
  //         <span className='visually-hidden'>Loading...</span>
  //       </Spinner>
  //     );

  // if (request.pending)
  //   return (
  //     <Spinner className='mt-3' animation='border' role='status'>
  //       <span className='visually-hidden'>Loading...</span>
  //     </Spinner>
  //   );

  // if (list?.items.length === 0)
  //   return <Alert color='info'>Something went wrong...</Alert>;

  if (!list)
    return (
      <Spinner className='mt-3' animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );

  return (
    <div>
      <h1 className={styles.header_text}>Edit list</h1>
      <Row className={styles.form}>
        <Col xs={12} xl={7}>
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
          <Row className='d-flex justify-content-start'>
            <Col xs={2}>
              <Link to={'/lists/' + id}>
                <SmallButton>Back to lists</SmallButton>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={0} xl={5} className={styles.image_col}>
          {' '}
          <img
            src={`${process.env.PUBLIC_URL}/images/pexels-nataliya-vaitkevich-6214376.jpg`}
            alt='shopping list'
          />
        </Col>
      </Row>
    </div>
  );
};

export default EditList;
