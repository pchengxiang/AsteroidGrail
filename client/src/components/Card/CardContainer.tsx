import { useState } from 'react';
import Card from './Card';

const CardContainer = () => {
  const [cards, setCards] = useState([
    { id: '1', content: '卡片 1' },
    { id: '2', content: '卡片 2' },
    { id: '3', content: '卡片 3' },
  ]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('cardId', id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedCardId = e.dataTransfer.getData('cardId');
    // 在這裡處理卡片位置的更新邏輯
    console.log(draggedCardId);
  };

  return (
    <div 
      className="card-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          content={card.content}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};

export default CardContainer;
