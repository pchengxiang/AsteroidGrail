import { useState } from "react";

interface DroppableAreaProps {
    onTrigger: (event: React.DragEvent<HTMLDivElement>) => void;
}
export const DroppableArea = ({ onTrigger }: DroppableAreaProps) => {
    const [dragOver, setDragOver] = useState(false);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        // event.dataTransfer.items.add('cardData', 'application/json');
        //event.dataTransfer.setData('application/json',)
        // 將卡資料序列化，放進去
    }
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (dragOver) {
            onTrigger(event);
        }
    };

    return (
        <div
            className="droppable-area"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {dragOver ? '放置卡牌' : '拖曳卡牌至此區域'}
        </div>
    );
};