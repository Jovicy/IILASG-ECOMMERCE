import { Star1 } from "iconsax-reactjs";

interface StarRatingProps {
  rating: number;
  size?: number | string;
  className?: string;
  clickable?: boolean;
}

const StarRating = ({ rating, size = 16, className = "", clickable = false }: StarRatingProps) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star1 key={i} size={size} variant={i < rating ? "Bold" : "Linear"} className={`text-primary-500 ${clickable ? "cursor-pointer" : ""} ${className}`} />
      ))}
    </div>
  );
};

export default StarRating;
