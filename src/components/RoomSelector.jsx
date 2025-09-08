import React from 'react';

// roomselector lets the user to decide which room they are designing
// when user selects a new background or layout on design with different furniture items
const RoomSelector = ({ selectedRoom, onSelectRoom }) => {
    // rooms array
    const rooms = ["Living Room", "Bedroom", "Office"]

    return (
        <>
            <div className='room-selector'>
                {rooms.map((room) => (
                    <button
                        key={room}
                        onClick={() => onSelectRoom(room)}
                        className={selectedRoom === room ? 'active' : ''}>
                        {room}
                    </button>
                ))}
            </div>
        </>
    )
}

export default RoomSelector