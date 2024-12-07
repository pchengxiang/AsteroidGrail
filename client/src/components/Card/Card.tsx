import { CSSProperties, useState } from "react";
import "./Card.css"

interface CardProps {
  id: string;
  content: string;
  style: CSSProperties;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Card: React.FC<CardProps> = ({ id, content, style, onDragStart, onDragEnd, onDrop, onMouseEnter, onMouseLeave }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`card ${isExpanded ? 'card-expanded' : ''}`}
      style={{
        ...style
      }}
      draggable
      onClick={handleExpand}
      onDragStart={(e) => onDragStart?.(e, id)}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>火神斬</div>
      <div>技</div>
      <div>對敵人造成兩點傷害</div>
    </div>
  );
};

export default Card;
