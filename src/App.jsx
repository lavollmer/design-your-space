import React, { useState } from 'react';
import './App.css'
import RoomButton from "./components/RoomSelector"
import FurniturePalette from './components/FurniturePalette';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  // setting useState to null for selectedroom
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <RoomButton selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
          <FurniturePalette selectedRoom={selectedRoom}/>
        </div>
      </DndProvider>
    </>
  )
}

export default App
