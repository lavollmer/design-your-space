import { furnitureByRoom } from "../data/FurnitureItem"

const FurniturePalette = ({selectedRoom}) => {
    const furnitureItems = selectedRoom ? furnitureByRoom[selectedRoom] : [];

    return (
        <div>
            <h3>{selectedRoom || 'Choose a room'}</h3>
            <div>
                {furnitureItems.map((item) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData('application/furniture', JSON.stringify(item));
                        }}
                    >
                        <img src={item.img} alt={item.name} width="60" />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FurniturePalette