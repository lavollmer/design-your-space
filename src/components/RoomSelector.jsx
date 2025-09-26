// roomselector lets the user to decide which room they are designing
const RoomSelector = ({ selectedRoom, onSelectRoom }) => {
    // rooms array variable
    const rooms = ["Living Room", "Bedroom", "Office"]

    return (
        <>
        {/* map the rooms variable to loop over each item in the array, on click set select room to the room */}
            <div className='room-selector'>
                {rooms.map((room) => (
                    // each button has a unique key, displays the room name by room
                    <button
                        key={room}
                        onClick={() => onSelectRoom(room)}
                        // dynamic className
                        className={selectedRoom === room ? 'active' : ''}>
                        {room}
                    </button>
                ))}
            </div>
        </>
    )
}

export default RoomSelector