import React, { useState } from 'react';
import './App.css'
import RoomButton from "./components/RoomSelector"
import FurniturePalette from './components/FurniturePalette';
import { furnitureByRoom } from "./data/FurnitureItem"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <h1>hello</h1>
          <RoomButton />
          <FurniturePalette />
        </div>
      </DndProvider>
    </>
  )
}

export default App
