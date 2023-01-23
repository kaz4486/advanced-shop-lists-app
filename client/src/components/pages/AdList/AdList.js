import { useDispatch } from 'react-redux';
import AdListForm from '../../features/AdListForm/AdListForm';

const AdList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Ad list</h1>
      <AdListForm />
    </div>
  );
};

export default AdList;
