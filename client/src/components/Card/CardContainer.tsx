import { useState } from 'react';
import Card from './Card';
import { useSpring, animated } from "@react-spring/web";
import "./CardContainer.css"

const CardContainer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev); // 切換堆疊展開狀態
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index); // 設置懸停的索引
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // 清空懸停索引
  };

  return (
    <div
      className="card-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          onMouseEnter={() => handleMouseEnter(index)} // 滑鼠進入
          onMouseLeave={handleMouseLeave}             // 滑鼠離開
          style={{
            transform: isExpanded
              ? `translateX(${index * 60}px)` // 展開
              : `translateX(${-index * 60}px)`, // 堆疊
            transition: "transform 0.5s ease",
            zIndex: hoveredIndex === index ? 10 : isExpanded ? index : 5 - index, // 控制疊放順序
          }}
          content={card.content}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};

export default CardContainer;
