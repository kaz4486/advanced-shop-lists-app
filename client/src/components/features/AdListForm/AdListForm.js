import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../../redux/itemsRedux';
import { createListRequest, getListById } from '../../../redux/listsRedux';
import ListForm from '../../common/ListForm/ListForm';
import ListItem from '../../common/ListItem/ListItem';

const AdListForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  console.log(items);

  return (
    <div>
      {items.map((item) => (
        <ListItem item={item} />
      ))}
      <ListForm />
    </div>
  );
};

export default AdListForm;
