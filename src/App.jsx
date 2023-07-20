import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';

const App = () => {
  return (
    <div className="layout__wrapper">
      <DragDropContext
        onDragEnd={() => {
          console.log('drag and drop event');
        }}
      >
        <div className="dashboard">
          <div className="header">
            <div>header</div>
          </div>
          <div className="body-box">
            <div>bodyBox</div>;
          </div>
          <div className="footer">
            <div>footer</div>;
          </div>
        </div>
        <div className="sideContainer">
          <Droppable droppableId="sideContainer" type="container">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Draggable draggableId="image" index={1}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      Image
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="text" index={2}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      Text
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId="link" index={3}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      Link
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
