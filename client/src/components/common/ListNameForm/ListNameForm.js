import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../Button/Button';
import styles from './ListNameForm.module.scss';

const ListNameForm = ({
  subbmitedName,
  setSubmitedListName,
  setSubmitedListNameError,
}) => {
  const [listName, setListName] = useState('');
  const [listNameError, setListNameError] = useState(false);
  //   const [submittedListName, setSubmittedListName] = useState('');

  const handleListNameSubmit = (e) => {
    e.preventDefault();
    if (listName === '' || listName.length > 30) {
      setListNameError(true);
    } else {
      setListNameError(false);
      setSubmitedListName(listName);
    }
  };

  const handleInputChange = (value) => {
    setListName(value);
    setListNameError(false);
    setSubmitedListNameError(false);
  };

  return (
    <Container>
      <div className={styles.form_section}>
        <Row>
          {subbmitedName && <h2>{subbmitedName}</h2>}

          {!subbmitedName && (
            <form
              onSubmit={(e) => handleListNameSubmit(e)}
              className={styles.form}
            >
              <Row className='align-items-center mb-2'>
                <Col xs={12} md={6} className='d-flex justify-content-end'>
                  <input
                    type='text'
                    value={listName}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder='Insert list name...'
                  />
                </Col>
                <Col xs={12} md={6} className='d-flex justify-content-start'>
                  <Button type='submit'>Submit list name</Button>
                </Col>
              </Row>
              {listNameError && (
                <p className={styles.p}>
                  List name is required and should have max 30 sings
                </p>
              )}
            </form>
          )}

          {subbmitedName && (
            <Button onClick={() => setSubmitedListName('')}>Edit name</Button>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default ListNameForm;
