import StarRating from "./StarRating";

interface RatingDistributionProps {
  ratings: Record<number, number>;
}

const RatingDistribution = ({ ratings }: RatingDistributionProps) => {
  const maxCount = Math.max(...Object.values(ratings), 1);

  return (
    <div className="flex flex-col gap-3">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratings[star] || 0;
        const percentage = (count / maxCount) * 100;

        return (
          <div key={star} className="flex items-center gap-3">
            <StarRating rating={star} size={16} clickable />

            {/* Progress bar */}
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[300px] w-full">
              <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
            </div>

            {/* Count */}
            <span className="text-sm text-gray-600 w-6 text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingDistribution;
