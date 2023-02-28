import { Container } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { forwardRef, useEffect, useState } from 'react';
import ListItem from '../../common/ListItem/ListItem';
import { getPageMargins } from '../../../utils/printPageMargin';
import styles from './ItemsList.module.scss';
import ItemBar from '../../common/ItemBar/ItemBar';

const ItemsList = forwardRef(({ items, removeItem }, ref) => {
  console.log(items);
  const [itemsState, setItemsState] = useState(null);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(itemsState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItemsState(items);
  };

  return (
    <Container ref={ref} className={styles.container}>
      <style>{getPageMargins()}</style>
      <ItemBar />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='items'>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.list}
            >
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
                              <ListItem item={item} removeAction={removeItem} />
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
    </Container>
  );
});

export default ItemsList;
