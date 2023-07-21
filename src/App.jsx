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
    const { source, destination, draggableId } = results;

    const getItemName = draggableId.split('_');
    const typeOfItem = getItemName[0];
    //destination = null, no action
    if (!destination) return;

    // destination and index similar to previus state, no action
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    //only change index --> Reorder items
    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
      //reorder items in header
      if (source.droppableId === 'header') {
        const reorderedItems = [...headerItems];

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const [removedItem] = reorderedItems.splice(sourceIndex, 1);
        reorderedItems.splice(destinationIndex, 0, removedItem);

        return setHeaderItems(reorderedItems);
      } else if (source.droppableId === 'bodyBox') {
        //reorder items in bodyBox
        const reorderedItems = [...bodyBoxItems];

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const [removedItem] = reorderedItems.splice(sourceIndex, 1);
        reorderedItems.splice(destinationIndex, 0, removedItem);

        return setBodyBoxItems(reorderedItems);
      } else if (source.droppableId === 'footer') {
        //reorder items in footer
        const reorderedItems = [...footerItems];

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const [removedItem] = reorderedItems.splice(sourceIndex, 1);
        reorderedItems.splice(destinationIndex, 0, removedItem);

        return setFooterItems(reorderedItems);
      }
    }

    // add image to header
    if (
      source.droppableId === 'sideContainer' &&
      destination.droppableId === 'header' &&
      typeOfItem === 'Image'
    ) {
      const draggedItem = items[source.index];

      setHeaderItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);

        return updatedItems;
      });
    }

    //add item to bodyBox
    if (source.droppableId === 'sideContainer' && destination.droppableId === 'bodyBox') {
      const draggedItem = items[source.index];
      setBodyBoxItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);

        return updatedItems;
      });
    }

    // add text to footer
    if (
      source.droppableId === 'sideContainer' &&
      destination.droppableId === 'footer' &&
      typeOfItem === 'Text'
    ) {
      const draggedItem = items[source.index];

      setFooterItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);

        return updatedItems;
      });
    }

    //Transfer items from header to bodyBox
    if (source.droppableId === 'header' && destination.droppableId === 'bodyBox') {
      const draggedItem = headerItems[source.index];

      setBodyBoxItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);

        return updatedItems;
      });

      setHeaderItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(draggedItem, 1);

        return updatedItems;
      });
    }

    //Transfer images from bodyBox to header
    if (
      source.droppableId === 'bodyBox' &&
      destination.droppableId === 'header' &&
      typeOfItem === 'Image'
    ) {
      const draggedItem = bodyBoxItems[source.index];

      setHeaderItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(destination.index, 0, draggedItem);

        return updatedItems;
      });

      setBodyBoxItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(draggedItem, 1);

        return updatedItems;
      });
    }

    //Delete items in use (not specified in task but may be useful)
    //delete from HEADER
    if (source.droppableId === 'header' && destination.droppableId === 'sideContainer') {
      const draggedItem = headerItems[source.index];
      setHeaderItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(draggedItem, 1);

        return updatedItems;
      });
    }

    //delete from BODYBOX
    if (source.droppableId === 'bodyBox' && destination.droppableId === 'sideContainer') {
      const draggedItem = bodyBoxItems[source.index];
      setBodyBoxItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(draggedItem, 1);

        return updatedItems;
      });
    }

    //delete from FOOTER
    if (source.droppableId === 'footer' && destination.droppableId === 'sideContainer') {
      const draggedItem = footerItems[source.index];
      setFooterItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(draggedItem, 1);

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
                    draggableId={`${item.name}_h.${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="itemHeader"
                      >
                        {item.name}_{index}
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
                    draggableId={`${item.name}_b.${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="itemBodyBox"
                      >
                        {item.name}_{index}
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
                    draggableId={`${item.name}_f.${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="itemFooter"
                      >
                        {item.name}_{index}
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
