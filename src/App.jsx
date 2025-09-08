import React, { useState } from 'react';
import './App.css'
import RoomButton from "./components/RoomSelector"
import FurniturePalette from './components/FurniturePalette';
import Canvas from './components/Canvas'
import { furnitureByRoom } from './data/FurnitureItem'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  // setting useState to null for selectedroom
  const [selectedRoom, setSelectedRoom] = useState(null);

  // define dropped items
  const [droppedItems, setDroppedItems] = useState([]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <RoomButton selectedRoom={selectedRoom} onSelectedRoom={setSelectedRoom} />
          <FurniturePalette selectedRoom={selectedRoom} />
          <Canvas droppedItems={droppedItems} />
        </div>
      </DndProvider>
    </>
  )
}

export default App
