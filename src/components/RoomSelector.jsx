import React from 'react'

const RoomSelector = () => {
    // rooms array
    const rooms = ["Living Room", "Bedroom", "Office"]

  return (
    <div>
        {rooms.maps()}
    </div>
  )
}

export default RoomSelector