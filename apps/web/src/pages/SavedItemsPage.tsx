import { ShoppingCart, Star1, Heart } from "iconsax-reactjs";
import { featuredProducts } from "@/data/database";
import { useNavigate } from "react-router-dom";

const SavedItemsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-grey-950 mb-6">Saved Items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-4 rounded-b-md">
        {featuredProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(`/buyer/products/${product.id}`)}
            className="relative group overflow-hidden rounded-xl cursor-pointer transition-all duration-300"
          >
            {/* Discount badge */}
            {product.discount && (
              <span className="absolute top-5 right-5 bg-white text-sm font-medium text-grey-900 px-4 py-1 rounded-full z-20">
                {product.discount}% Off
              </span>
            )}

            <div className="flex flex-col gap-4 py-2">
              {/* Image Container */}
              <div className="relative bg-[#F6F6F6] h-60 w-full rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient overlay only on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-400/40 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-2">
                <div className="text-base font-medium text-grey-900">
                  {product.name}
                </div>
                <div className="text-xs flex items-center gap-1">
                  <Star1 className="w-2.5 text-primary-500" variant="Bold" />
                  <p className="text-grey-800 cursor-pointer">
                    {product.rating.toFixed(1)} ({product.reviews.toLocaleString()} Reviews)
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-base font-semibold text-grey-900">
                    ₦{product.price.toLocaleString()}
                  </div>
                  <div className="flex gap-4">
                    <ShoppingCart variant="Bold" className="cursor-pointer text-grey-900" />
                    <Heart variant="Bold" className="cursor-pointer text-primary-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {featuredProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${product.id}`)}
            className="relative group overflow-hidden rounded-xl cursor-pointer transition-all duration-300"
          >
            {/* Discount badge */}
            {product.discount && (
              <span className="absolute top-5 right-5 bg-white text-sm font-medium text-grey-900 px-4 py-1 rounded-full z-20">
                {product.discount}% Off
              </span>
            )}

            <div className="flex flex-col gap-4 py-2">
              {/* Image Container */}
              <div className="relative bg-[#F6F6F6] h-60 w-full rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient overlay only on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-400/40 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-2">
                <div className="text-base font-medium text-grey-900">
                  {product.name}
                </div>
                <div className="text-xs flex items-center gap-1">
                  <Star1 className="w-2.5 text-primary-500" variant="Bold" />
                  <p className="text-grey-800 cursor-pointer">
                    {product.rating.toFixed(1)} ({product.reviews.toLocaleString()} Reviews)
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-base font-semibold text-grey-900">
                    ₦{product.price.toLocaleString()}
                  </div>
                  <div className="flex gap-4">
                    <ShoppingCart variant="Bold" className="cursor-pointer text-grey-900" />
                    <Heart variant="Bold" className="cursor-pointer text-primary-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItemsPage;
