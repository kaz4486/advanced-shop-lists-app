import { useDispatch, useSelector } from 'react-redux';
import ListForm from '../../features/ListForm/ListForm';
import createPublicationDate from '../../../utils/createPublicationDate';
import { createListRequest } from '../../../redux/listsRedux';
import { useState } from 'react';
import { getItems } from '../../../redux/itemsRedux';
import { getUser } from '../../../redux/userRedux';
import { Col, Row } from 'react-bootstrap';
import styles from './AddList.module.scss';

const AddList = () => {
  const dispatch = useDispatch();

  // const listName = null;

  const items = useSelector(getItems);
  const user = useSelector(getUser);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);

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
      setShowModal(true);
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

  //return różne warianty

  return (
    <div>
      <h1 className={styles.header_text}>Add your list!</h1>
      <Row className='p-0'>
        <Col xs={12} xl={7} className={styles.form}>
          {' '}
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
            showModal={showModal}
            // setShowModal={setShowModal}
            handleClose={handleClose}
          />
        </Col>
        <Col xs={0} xl={5} className='p-0'>
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

export default AddList;
