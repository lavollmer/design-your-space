// goals of this component
// accept dropped items from furniture palette
// track their position and type
// render items at position
// allow dragging them again
// save layout to local storage

import React, { useRef, useState } from 'react'

const Canvas = ({ droppedItems, setDroppedItems }) => {
  // Drag-to-move logic
  const getTrashRect = () => {
    const trash = document.getElementById('canvas-trashcan');
    if (trash) return trash.getBoundingClientRect();
    return null;
  };

  const handleImageMouseDown = (e, index) => {
    if (e.button !== 0) return; // Only left click
    setSelectedIndex(index);
    setDraggingIndex(index);
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = droppedItems[index].x;
    const origY = droppedItems[index].y;
    const moveHandler = (moveEvent) => {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = origX + (moveEvent.clientX - startX);
      const newY = origY + (moveEvent.clientY - startY);
      setDroppedItems((prevItems) =>
        prevItems.map((it, i) =>
          i === index ? { ...it, x: Math.max(0, Math.min(newX, canvasRect.width - (it.width || 60))), y: Math.max(0, Math.min(newY, canvasRect.height - (it.height || 60))) } : it
        )
      );
      // Trashcan hover detection
      const trashRect = getTrashRect();
      if (trashRect && moveEvent.clientX >= trashRect.left && moveEvent.clientX <= trashRect.right && moveEvent.clientY >= trashRect.top && moveEvent.clientY <= trashRect.bottom) {
        setIsOverTrash(true);
      } else {
        setIsOverTrash(false);
      }
    };
    const upHandler = (upEvent) => {
      // If released over trash, delete
      const trashRect = getTrashRect();
      if (trashRect && upEvent.clientX >= trashRect.left && upEvent.clientX <= trashRect.right && upEvent.clientY >= trashRect.top && upEvent.clientY <= trashRect.bottom) {
        setDroppedItems((prev) => prev.filter((_, i) => i !== index));
        setSelectedIndex(null);
      }
      setDraggingIndex(null);
      setIsOverTrash(false);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
      document.body.style.cursor = 'default';
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
    document.body.style.cursor = 'move';
  };
  const canvasRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const itemData = JSON.parse(e.dataTransfer.getData('application/furniture'));
    const newItem = {
      ...itemData,
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
      width: 60,
      height: 60,
      uuid: Date.now(),
    };
    setDroppedItems((prev) => [...prev, newItem]);
  };

  // Resize logic
  const handleResizeStart = (e, index) => {
    e.stopPropagation();
    setIsResizing(true);
    setSelectedIndex(index);
    document.body.style.cursor = 'nwse-resize';

    const startX = e.clientX;
    const startY = e.clientY;
    const origWidth = droppedItems[index].width || 60;
    const origHeight = droppedItems[index].height || 60;

    const moveHandler = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setDroppedItems((prevItems) =>
        prevItems.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              width: Math.max(20, origWidth + deltaX),
              height: Math.max(20, origHeight + deltaY),
            };
          }
          return item;
        })
      );
    };

    const upHandler = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  };

  const handleResize = (e) => {
    if (isResizing && selectedIndex !== null) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;
      setDroppedItems((prevItems) =>
        prevItems.map((item, i) => {
          if (i === selectedIndex) {
            return {
              ...item,
              width: Math.max(20, mouseX - item.x),
              height: Math.max(20, mouseY - item.y),
            };
          }
          return item;
        })
      );
    }
  };

  // ...existing code...

  // Render
  return (
    <div
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      className='canvas'
      style={{ position: 'relative' }}
    >
      {droppedItems.map((item, index) => (
        <React.Fragment key={item.uuid}>
          <img
            src={item.img}
            alt={item.name}
            onMouseDown={e => handleImageMouseDown(e, index)}
            onClick={() => setSelectedIndex(index)}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: item.width || 60,
              height: item.height || 60,
              cursor: selectedIndex === index ? 'pointer' : 'move',
              border: selectedIndex === index ? '2px solid #007bff' : 'none',
              boxSizing: 'border-box',
              zIndex: selectedIndex === index ? 2 : 1,
              userSelect: 'none',
            }}
            draggable={false}
          />
          {selectedIndex === index && (
            <div
              onMouseDown={e => handleResizeStart(e, index)}
              style={{
                position: 'absolute',
                left: (item.x + (item.width || 60)) - 8,
                top: (item.y + (item.height || 60)) - 8,
                width: 16,
                height: 16,
                background: '#fff',
                border: '2px solid #007bff',
                borderRadius: 4,
                cursor: 'nwse-resize',
                zIndex: 3,
              }}
            />
          )}
        </React.Fragment>
      ))}
      {/* Trashcan icon */}
      <div
        id="canvas-trashcan"
        style={{
          position: 'absolute',
          right: 8,
          bottom: 8,
          width: 144,
          height: 170,
          zIndex: 10,
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Drag here to delete"
      >
        <img
          src="/assets/trashcan.png"
          alt="Trashcan"
          style={{
            width: 144,
            height: 200,
            filter: isOverTrash ? 'drop-shadow(0 0 32px #ff4d4f) brightness(1.2)' : 'none',
            transition: 'filter 0.2s',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>
    </div>
  );
}

export default Canvas