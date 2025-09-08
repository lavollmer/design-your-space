// goals of this component
// accept dropped items from furniture palette
// track their position and type
// render items at position
// allow dragging them again
// save layout to local storage

import React, { useRef, useState } from 'react'

const Canvas = ({ droppedItems, setDroppedItems }) => {
  const canvasRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

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
      width: 60,
      height: 60,
      uuid: Date.now(),
    };
    setDroppedItems((prev) => [...prev, newItem]);
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  // Trashcan bounding box helper
  const getTrashRect = () => {
    const trash = document.getElementById('canvas-trashcan');
    if (trash) return trash.getBoundingClientRect();
    return null;
  };

  // Drag-to-move logic with trashcan detection
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

  // Resize logic
  const handleResizeStart = (e, index) => {
    e.stopPropagation();
    setIsResizing(true);
    setSelectedIndex(index);
    document.body.style.cursor = 'nwse-resize';
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

  const handleResizeEnd = () => {
    setIsResizing(false);
    document.body.style.cursor = 'default';
  };

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    } else {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, selectedIndex]);
  return (
    <div
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={allowDrop}
      className='canvas'
      style={{ position: 'relative' }}
    >
      {droppedItems.map((item, index) => (
        <React.Fragment key={item.uuid}>
          <img
            src={item.img}
            alt={item.name}
            onMouseDown={(e) => handleImageMouseDown(e, index)}
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
            <>
              {/* Resize handle */}
              <div
                onMouseDown={(e) => handleResizeStart(e, index)}
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
            </>
          )}
        </React.Fragment>
      ))}
      {/* Trashcan icon */}
      <div
        id="canvas-trashcan"
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          width: 48,
          height: 48,
          background: isOverTrash ? '#ff4d4f' : '#fff',
          border: '2px solid #888',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isOverTrash ? '0 0 12px #ff4d4f' : '0 1px 4px rgba(0,0,0,0.10)',
          zIndex: 10,
          transition: 'background 0.2s, box-shadow 0.2s',
          fontSize: 32,
          cursor: 'pointer',
          userSelect: 'none',
        }}
        title="Drag here to delete"
      >
        🗑️
      </div>
    </div>
  );
}

export default Canvas