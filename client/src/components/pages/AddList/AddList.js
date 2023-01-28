import { useDispatch } from 'react-redux';
import AddListForm from '../../features/AddListForm/AddListForm';

const AddList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Ad list</h1>
      <AddListForm />
    </div>
  );
};

export default AddList;
