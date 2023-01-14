import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/itemsRedux';

const ListForm = (text) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  // const [amount, setAmount] = useState('')
  // const [amount, setAmount] = useState('')

  const dispatch = useDispatch();

  const handleAddItem = (e) => {
    e.preventDefault();
    dispatch(addItem({ name, amount }));
    setName('');
    setAmount('');
  };
  return (
    <form onSubmit={handleAddItem}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {/* <input type='text' value={name} onChange={(e) => setName(e.target.value)} /> */}
      <button type='submit'>Add item</button>
    </form>
  );
};

export default ListForm;
