import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, loadItems, removeItem } from '../../../redux/itemsRedux';
import {
  createListRequest,
  getListById,
  getRequest,
  loadListsRequest,
} from '../../../redux/listsRedux';
import ItemBar from '../../common/ItemBar/ItemBar';
import ListForm from '../../common/ListForm/ListForm.tsx';
import ListItem from '../../common/ListItem/ListItem';
import { Alert } from 'react-bootstrap';
import SwitchSystem from '../SwitchSystem/SwitchSystem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AddListForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const request = useSelector(getRequest);

  const [system, setSystem] = useState('metric');
  const [itemsState, setItemsState] = useState(null);

  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(itemsState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItemsState(items);
  };

  console.log(items);
  console.log(itemsState);

  const handleSwitchSystem = () => {
    system === 'metric' ? setSystem('imperial') : setSystem('metric');
  };

  const handleItemRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  useEffect(() => {
    dispatch(loadListsRequest());
    setItemsState(items);
  }, [dispatch, items]);

  if (request.pending)
    return (
      <Spinner className='mt-3' animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  if (request.error) return <Alert color='warning'>{request.error}</Alert>;
  if (!request.success)
    return <Alert color='info'>Something went wrong...</Alert>;
  if (request.success)
    return (
      <Container>
        <ItemBar />
        <SwitchSystem action={handleSwitchSystem} system={system} />

        {items.length !== 0 && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='items'>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {itemsState !== null &&
                    itemsState.map((item, index) => {
                      if (item.id)
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <ListItem
                                    item={item}
                                    removeAction={handleItemRemove}
                                  />
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      return null;
                    })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <ListForm system={system} />
      </Container>
    );
};

export default AddListForm;
