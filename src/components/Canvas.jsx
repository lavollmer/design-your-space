// goals of this component
// accept dropped items from furniture palette
// track their position and type
// render items at position
// allow dragging them again
// save layout to local storage

import React, { useRef } from 'react'

const Canvas = ({ droppedItems, setDroppedItems }) => {
  const canvasRef = useRef();

  const handleDrop = (e) => {
    // prevent the page from reloading
    e.preventDefault();

    // getting canvas's position relative to viewport
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const itemData = JSON.parse(e.dataTransfer.getData('application/furniture'));

    const newItem = {
      ...itemData,
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
      uuid: Date.now(),
    };

    setDroppedItems((prev) => [...prev, newItem]);
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  const handleDrag = (e, index) => {
    const canvasRect = canvasRef.current.getBoundingClient();
    const newX = e.clientX - canvasRect.left;
    const newY = e.clientY - canvasRect.top;

    setDroppedItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, x: newX, y: newY } : item
      )
    )
  };

  return (
    <div
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      {droppedItems.map((item, index) => (
        <img
          key={item.uuid}
          src={item.img}
          alt={item.name}
          draggable
          onDragEnd={(e) => handleDrag(e, index)}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            width: '60px',
            cursor: 'move',
          }}
        />
      ))}
    </div>
  )
}

export default Canvas