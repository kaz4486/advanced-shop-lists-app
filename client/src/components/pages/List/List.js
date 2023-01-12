import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListById, loadListsRequest } from '../../../redux/listsRedux';

const List = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const list = useSelector((state) => getListById(state, id));
  console.log(list);

  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch]);

  return (
    <div>
      {list.items.map((item) => (
        <div key={item.name}>
          <h4>{item.name}</h4>
          <p>{item.amount}</p>
          <p>{item.obj}</p>
          <p>{item.jedn}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
