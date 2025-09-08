import React from 'react'

const RoomSelector = () => {
    // rooms array
    const rooms = ["Living Room", "Bedroom", "Office"]

  return (
    <div>
        {rooms.map((item,index)=> {
            <button key={index}>{item}</button>
        })}
    </div>
  )
}

export default RoomSelector