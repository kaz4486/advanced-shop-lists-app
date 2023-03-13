import { useDispatch, useSelector } from 'react-redux';
import ListForm from '../../features/ListForm/ListForm';
import createPublicationDate from '../../../utils/createPublicationDate';
import { createListRequest } from '../../../redux/listsRedux';
import { useState } from 'react';
import { getItems } from '../../../redux/itemsRedux';
import { getUser } from '../../../redux/userRedux';
import { Col, Row } from 'react-bootstrap';
import styles from './AddList.module.scss';
import { Link } from 'react-router-dom';
import SmallButton from '../../common/SmallButton/SmallButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const AddList = () => {
  const dispatch = useDispatch();

  const items = useSelector(getItems);
  const user = useSelector(getUser);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

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
  };

  return (
    <div>
      <Row className='w-100 m-0 p-0'>
        <h1 className={styles.header_text}>Add your list!</h1>
        <Row className={styles.row}>
          <Col sm={12} xl={7} className={styles.form}>
            <div className='p-3'>
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
                handleClose={handleClose}
              />
              <Row className='d-flex justify-content-start'>
                <Col sm={2} className='m-3'>
                  <Link to={'/'}>
                    <SmallButton>
                      <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className={styles.icon}
                      />
                      Back to home
                    </SmallButton>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>

          <Col sm={0} xl={5} className={styles.image_col}>
            {' '}
            <img
              src={`${process.env.PUBLIC_URL}/images/pexels-nataliya-vaitkevich-6214376.jpg`}
              alt='shopping list'
            />
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default AddList;
