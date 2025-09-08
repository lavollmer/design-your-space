import React from 'react'
// useDrag hook 
import { useDrag } from 'react-dnd';
import ItemTypes from "../data/FurnitureItem"

const FurniturePalette = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.FurnitureItem,
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