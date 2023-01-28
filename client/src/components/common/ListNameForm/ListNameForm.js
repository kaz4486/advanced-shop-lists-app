import { useState } from 'react';
import { Container } from 'react-bootstrap';

const ListNameForm = ({ subbmitedName, action }) => {
  const [listName, setListName] = useState('');
  //   const [submittedListName, setSubmittedListName] = useState('');

  const handleListNameSubmit = (e) => {
    e.preventDefault();
    action(listName);
    // required name
  };

  return (
    <Container>
      {subbmitedName && <h2>{subbmitedName}</h2>}
      {!subbmitedName && (
        <form onSubmit={(e) => handleListNameSubmit(e)}>
          <input
            type='text'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder='Insert list name...'
          />

          <button type='submit'>Submit list name</button>
        </form>
      )}
      {subbmitedName && <button onClick={() => action('')}>Edit name</button>}
    </Container>
  );
};

export default ListNameForm;
