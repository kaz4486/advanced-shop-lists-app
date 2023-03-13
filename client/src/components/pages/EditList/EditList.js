import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addItem, getItems } from '../../../redux/itemsRedux';
import {
  editListRequest,
  getListById,
  getRequest,
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

  const items = useSelector(getItems);
  const request = useSelector(getRequest);
  console.log(request);
  console.log('list', list);

  useEffect(() => {
    dispatch(loadListsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const [submitedListName, setSubmitedListName] = useState(list?.name);

  const [submitListNameError, setSubmitedListNameError] = useState(false);
  const [submitListItemError, setSubmitedListItemError] = useState(false);

  useEffect(() => {
    list?.items.forEach((item) => dispatch(addItem({ ...item })));
    setSubmitedListName(list?.name);
  }, [dispatch, list]);

  let listToEdit = {};

  const handleListSubmit = (e) => {
    e.preventDefault();
    setSubmitedListItemError(false);
    setSubmitedListNameError(false);

    listToEdit.name = submitedListName;
    console.log(listToEdit.name);

    listToEdit.items = items;
    listToEdit.user = user;

    if (submitedListName && items.length !== 0) {
      dispatch(editListRequest(listToEdit, id));
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
        <h1 className={styles.header_text}>Edit list</h1>

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
                buttonName='Edit that list'
                id={id}
                showModal={showModal}
                handleClose={handleClose}
              />
              <Row className='d-flex justify-content-start'>
                <Col sm={2} className='m-3'>
                  <Link to={'/lists/' + id}>
                    <SmallButton>
                      <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className={styles.icon}
                      />
                      Back to lists
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

export default EditList;
