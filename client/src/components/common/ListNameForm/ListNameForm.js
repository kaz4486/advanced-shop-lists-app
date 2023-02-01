import { useState } from 'react';
import { Container } from 'react-bootstrap';

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
      {subbmitedName && <h2>{subbmitedName}</h2>}
      {!subbmitedName && (
        <form onSubmit={(e) => handleListNameSubmit(e)}>
          <input
            type='text'
            value={listName}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder='Insert list name...'
          />
          {listNameError && (
            <p>List name is required and should have max 30 sings</p>
          )}

          <button type='submit'>Submit list name</button>
        </form>
      )}
      {subbmitedName && (
        <button onClick={() => setSubmitedListName('')}>Edit name</button>
      )}
    </Container>
  );
};

export default ListNameForm;
