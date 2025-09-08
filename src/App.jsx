import React, {useState} from 'react';
import './App.css'
import RoomButton from "./components/RoomSelector"
import FurniturePalette from './components/FurniturePalette';
import {furnitureByRoom} from "./data/FurnitureItem"

function App() {

  return (
    <>
      <div>
        <h1>hello</h1>
        <RoomButton/>
      </div>
    </>
  )
}

export default App
