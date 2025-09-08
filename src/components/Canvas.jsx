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

  const handleDrag = (e, index) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left;
    const newY = e.clientY - canvasRect.top;
    setDroppedItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, x: newX, y: newY } : item
      )
    );
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
            onMouseDown={(e) => {
              if (e.button !== 0) return; // Only left click
              setSelectedIndex(index);
              const startX = e.clientX;
              const startY = e.clientY;
              const origX = item.x;
              const origY = item.y;
              const moveHandler = (moveEvent) => {
                const canvasRect = canvasRef.current.getBoundingClientRect();
                const newX = origX + (moveEvent.clientX - startX);
                const newY = origY + (moveEvent.clientY - startY);
                setDroppedItems((prevItems) =>
                  prevItems.map((it, i) =>
                    i === index ? { ...it, x: Math.max(0, Math.min(newX, canvasRect.width - (it.width || 60))), y: Math.max(0, Math.min(newY, canvasRect.height - (it.height || 60))) } : it
                  )
                );
              };
              const upHandler = () => {
                window.removeEventListener('mousemove', moveHandler);
                window.removeEventListener('mouseup', upHandler);
                document.body.style.cursor = 'default';
              };
              window.addEventListener('mousemove', moveHandler);
              window.addEventListener('mouseup', upHandler);
              document.body.style.cursor = 'move';
            }}
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
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Canvas