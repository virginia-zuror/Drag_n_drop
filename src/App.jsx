import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import { useState } from 'react';

const DATA = [
  { name: 'Image', id: 0 },
  { name: 'Text', id: 1 },
  { name: 'Table', id: 2 },
];

const App = () => {
  const [items, setItems] = useState(DATA);

  const [headerItems, setHeaderItems] = useState([]);
  const [bodyBoxItems, setBodyBoxItems] = useState([]);
  const [footerItems, setFooterItems] = useState([]);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (destination.droppableId === 'sideContainer') {
      const reorderedItems = [...items];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedItem] = reorderedItems.splice(sourceIndex, 1);
      reorderedItems.splice(destinationIndex, 0, removedItem);

      return setItems(reorderedItems);
    }

    if (source.droppableId === 'sideContainer' && destination.droppableId === 'header') {
      const draggedItem = items[source.index];
      setHeaderItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);
        //console.log('headerItems', updatedItems);
        return updatedItems;
      });
    }

    if (source.droppableId === 'sideContainer' && destination.droppableId === 'bodyBox') {
      const draggedItem = items[source.index];
      setBodyBoxItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);
        //console.log('bodyItems', updatedItems);
        return updatedItems;
      });
    }

    if (source.droppableId === 'sideContainer' && destination.droppableId === 'footer') {
      const draggedItem = items[source.index];
      setFooterItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);
        //console.log('footerItems', updatedItems);
        return updatedItems;
      });
    }
  };

  return (
    <div className="layout__wrapper">
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="header">
          <Droppable droppableId="header">
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="headerContainer"
                {...provided.droppableProps}
              >
                Header
                {headerItems.map((item, index) => (
                  <Draggable
                    key={`${item.name}_${index}`}
                    draggableId={`${item.name}_${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="itemHeader"
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="bodyBox">
          <Droppable droppableId="bodyBox">
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="bodyBoxContainer"
                {...provided.droppableProps}
              >
                Body
                {bodyBoxItems.map((item, index) => (
                  <Draggable
                    key={`${item.name}_${index}`}
                    draggableId={`${item.name}_${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="itemBodyBox"
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="footer">
          <Droppable droppableId="footer">
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="footerContainer"
                {...provided.droppableProps}
              >
                Footer
                {footerItems.map((item, index) => (
                  <Draggable
                    key={`${item.name}_${index}`}
                    draggableId={`${item.name}_${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="itemFooter"
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="sideContainer">
          <Droppable droppableId="sideContainer">
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="itemsSideContainer"
                {...provided.droppableProps}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.name} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="itemSideContainer"
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
