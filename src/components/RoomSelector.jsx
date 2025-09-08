import React from 'react';

const RoomSelector = ({ selectedRoom, onSelectRoom }) => {
    // rooms array
    const room = ["Living Room", "Bedroom", "Office"]

    return (
        <>
            <div>
                {room.map((room) => {
                    <button key={room} onClick={()=>onSelectRoom(room)} className={selectedRoom === room ? 'active': ''}>{room}</button>
                })}
            </div>
        </>
    )
}

export default RoomSelector