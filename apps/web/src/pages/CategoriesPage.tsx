import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  categories,
  featuredProducts,
  recentProducts,
  bestSellers,
} from "@/data/database";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Star1,
  Heart,
  ArrowLeft,
  Sort,
  ArrowDown2,
} from "iconsax-reactjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("Popularity");

  const sortOptions = [
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
  ];

  // Convert slug back to category name
  const categoryName = slug?.replace(/-/g, " ") || "";

  // Filter products by category
  let categoryProducts = [
    ...featuredProducts,
    ...recentProducts,
    ...bestSellers,
  ].filter(
    (product) => product.category?.toLowerCase() === categoryName.toLowerCase()
  );

  // Apply sorting logic (basic example)
  if (sortBy === "Price: Low to High") {
    categoryProducts = [...categoryProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    categoryProducts = [...categoryProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "Newest") {
    categoryProducts = [...categoryProducts].sort((a, b) => b.id - a.id); // assuming id is incremental
  }

  return (
    <div className="w-full">
      <div className="bg-grey-50 w-full p-6 rounded-lg flex justify-between items-center mb-6">
        <div className="flex justify-between items-center gap-4">
          <Link to="/">
            <ArrowLeft size="20" />
          </Link>
          <div className="flex items-center gap-1">
            <h2 className="text-lg capitalize font-medium text-grey-950">
              {categoryName}
            </h2>
            <p className="text-base font-normal text-grey-950">
              ({categoryProducts.length.toLocaleString()} products found)
            </p>
          </div>
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="bg-white w-[215px] rounded-full py-2 px-3 border border-grey-100 text-grey-800 flex items-center justify-between cursor-pointer">
              <div className="flex gap-2 items-center">
                <Sort size={18} />
                <p className="font-normal text-base">{sortBy}</p>
              </div>
              <ArrowDown2 size={18} />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[215px] rounded-lg">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSortBy(option)}
                className="cursor-pointer"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categoryProducts.map((product, index) => (
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
                      {product.rating.toFixed(1)} (
                      {product.reviews.toLocaleString()} Reviews)
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-base font-semibold text-grey-900">
                      ₦{product.price.toLocaleString()}
                    </div>
                    <div className="flex gap-4 text-gray-600">
                      <ShoppingCart
                        variant="Bold"
                        className="cursor-pointer text-grey-900"
                      />
                      <Heart className="cursor-pointer text-grey-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No products available in this category yet.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
