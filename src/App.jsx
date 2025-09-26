import { useState } from 'react';
import './App.css'
import RoomSelector from "./components/RoomSelector"
import FurniturePalette from './components/FurniturePalette';
import Canvas from './components/Canvas'
import Footer from './components/Footer'

function App() {
  // setting useState to null for selectedroom
  const [selectedRoom, setSelectedRoom] = useState(null);

  // define dropped items
  const [droppedItems, setDroppedItems] = useState([]);

  // program architecture is main title, room selector button, instructions, furniture palette, canvas, footer
  return (
    <>
      <div class='main-content'>
        <h1>Design Your Space</h1>
        <div>
          <div>
            <RoomSelector selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
          </div>
          <div>
            <h2 className='instructions'>Select, drag and resize the item you want to decorate with. If you want to remove the item, drag it to the trashcan in the room.</h2>
          </div>
          <div className='room'>
            <FurniturePalette selectedRoom={selectedRoom} />
          </div>
          <div>
            <Canvas droppedItems={droppedItems} setDroppedItems={setDroppedItems} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
