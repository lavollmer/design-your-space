import React from 'react'
// useDrag hook 
import {useDrag} from 'react-dnd';
import FurnitureItem from "../data/FurnitureItem"

const FurniturePalette = () => {
    const [{isDragging}, drag] = useDrag (() => ({
        type: ItemTypes.FurnitureItem,
        collect:(monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

  return (
    <div>FurniturePalette</div>
  )
}

export default FurniturePalette