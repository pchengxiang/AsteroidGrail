interface CardProps {
  id: string;
  content: string;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

const Card: React.FC<CardProps> = ({ id, content, onDragStart, onDragEnd, onDrop }) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => onDragStart?.(e, id)}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    >
      {content}
    </div>
  );
};

export default Card;
