import { useState } from 'react';
import './App.css'
import RoomSelector from "./components/RoomSelector"
import FurniturePalette from './components/FurniturePalette';
import Canvas from './components/Canvas'
import { furnitureByRoom } from './data/FurnitureItem'

function App() {
  // setting useState to null for selectedroom
  const [selectedRoom, setSelectedRoom] = useState(null);

  // define dropped items
  const [droppedItems, setDroppedItems] = useState([]);

  return (
    <>
      <div>
        <div>
          <h1>Design Your Space</h1>
        </div>
        <RoomSelector selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
        <FurniturePalette selectedRoom={selectedRoom} />
        <Canvas droppedItems={droppedItems} setDroppedItems={setDroppedItems} />
      </div>
    </>
  )
}

export default App
