import React from 'react'
// useDrag hook 
import { useDrag } from 'react-dnd';
import {furnitureByRoom} from "../data/FurnitureItem"

const FurniturePalette = () => {
    const furnitureItems = selectedRoom ? furnitureByRoom[selectedRoom] : [];

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.furnitureByRoom,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div ref={drag} style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
        }}>
            <h1>hello</h1>
        </div>
    )
}

export default FurniturePalette