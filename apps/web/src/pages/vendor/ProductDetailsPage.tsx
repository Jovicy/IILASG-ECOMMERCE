import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star1, Send2, ArrowDown2, TickCircle, ArrowLeft } from "iconsax-reactjs";
import { useGetProduct } from "@/hooks/product";
import { calculateDiscountedPrice } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Star } from "lucide-react";
import StarRating from "@/components/custom/StarRating";
import RatingDistribution from "@/components/custom/RatingDistribution";
import { Review } from "@/types/product";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useGetProduct(id);
  const product = data?.data;

  // ✅ Fix: quantity logic
  const [quantity, setQuantity] = useState(1);
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getRatingDistribution = (reviews: Review[]) => {
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating]++;
      }
    });

    const total = reviews.length || 1;
    const ratings = Object.fromEntries(Object.entries(ratingCounts).map(([star, count]) => [star, (count / total) * 100]));

    return ratings;
  };

  const ratings = getRatingDistribution(product.reviews);

  return !isFetching && product ? (
    <div className="w-full p-6">
      <Link to="/vendor/products" className="flex items-center gap-4 mb-12">
        <ArrowLeft size="20" />
        <h1 className="text-lg capitalize font-medium text-grey-950">{product.name}</h1>
      </Link>
      <div className="w-2/3 flex flex-col gap-8">
        <div className="flex gap-6">
          {/* Product Picture */}
          {product.images.length <= 0 && (
            <div className="w-[356px] h-[320px] bg-grey-500 rounded-lg p-4 flex items-end">
              <div className="flex gap-2">
                <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
                <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
                <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
                <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
              </div>
            </div>
          )}

          <div className="w-[356px] h-[320px] rounded-lg p-4 flex items-end bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${product.images[0].url})` }}>
            <div className="flex gap-2 ">
              {product.images.slice(1).map((img, index) => (
                <img key={index} src={img.url} alt={`Product thumbnail ${index + 1}`} className="h-14 w-14 rounded-sm object-cover" />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                {/* Product Name */}
                <h1 className="text-xl text-grey-700 font-normal">{product.name}</h1>
                <div className="flex items-center gap-3">
                  {/* Price */}
                  <p className="text-grey-950 font-medium text-xl">{calculateDiscountedPrice(product.price, product.discount)}</p>

                  {/* Discount */}
                  <span className="bg-grey-50 py-2 px-4 rounded-full text-sm font-normal text-grey-900">{product.discount}% Off</span>
                </div>

                {/* Product State */}
                <div className="flex items-center gap-3">
                  {product.quantity > 10 && <button className="py-2 px-3 rounded-full text-[11px] font-normal text-success-600 border border-success-600 bg-success-50">Available in stock</button>}
                  {product.quantity > 0 && product.quantity <= 10 && (
                    <button className="py-2 px-3 rounded-full text-[11px] font-normal text-primary-600 border border-primary-600 bg-primary-50">Limited Stock</button>
                  )}
                  {product.quantity === 0 && <button className="py-2 px-3 rounded-full text-[11px] font-normal text-error-600 border border-error-600 bg-error-50">Out of Stock</button>}
                </div>
                <div className="flex items-center gap-2">
                  {/* Star Rating */}
                  <div className="flex gap-1 items-center">
                    <Star1 className="text-primary-500 cursor-pointer" />
                    <Star1 className="text-primary-500 cursor-pointer" />
                    <Star1 className="text-primary-500 cursor-pointer" />
                    <Star1 className="text-primary-500 cursor-pointer" />
                    <Star1 className="text-primary-500 cursor-pointer" />
                  </div>

                  {/* Other Rating */}
                  <div>
                    <span className="text-grey-800 text-xs font-normal">
                      {`[${product.stats.totalReviews} Ratings]`} | {`[${product.numberSold} Sold]`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm text-grey-950 font-normal">Quantity</p>
                {/* Qunatity Increment */}
                <div className="flex gap-1 items-center">
                  <button onClick={decreaseQty} className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium">
                    -
                  </button>
                  <div className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium">{quantity}</div>
                  <button onClick={increaseQty} className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium">
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* Product Favorite */}
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-2 text-grey-600 text-sm">
                <Send2 className="cursor-pointer" />
                <p>Share this product</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {/* Product Description */}
          <div className="flex flex-col gap-2">
            <h1 className="text-base font-medium text-grey-950">Description</h1>
            <p className="text-base/7 text-grey-700">{product.description}</p>
          </div>

          {/* Product Features */}
          <div className="bg-[#FCFCFC] rounded-lg py-5 px-4 flex flex-col gap-4">
            <h1 className="text-base font-medium text-grey-950">Features</h1>
            <div className="flex flex-col gap-2">
              {product?.features.map((feature, i) => (
                <div key={i} className="py-4 px-3 border-b border-b-grey-100 rounded-lg">
                  <p className="text-grey-700 text-base font-normal">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Ratings Overall */}
          {product?.reviews && product?.reviews.length > 0 && (
            <>
              <div className="flex flex-col gap-6">
                <div className="border-b border-b-grey-100 pb-6">
                  <h1 className="text-base font-medium text-grey-950">Reviews</h1>
                </div>
                <div className="space-y-4">
                  <div className="inline-flex gap-3">
                    <h1 className="text-[26px] font-semibold">{product.stats.averageRating.toFixed(1)}</h1>
                    <div className="space-y-2">
                      <StarRating rating={product.stats.averageRating} size={14} />
                      <p className="text-xs font-normal text-grey-800">{`([${product.stats.totalReviews} Ratings])`}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col basis-full">
                    {/* <div className="flex gap-1 items-center">
                      <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                      <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                      <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                      <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                      <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    </div> */}
                    <RatingDistribution ratings={ratings} />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {product?.reviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-6 py-6 px-4 border border-grey-100 rounded-lg">
                      <StarRating rating={review.rating} />
                      <div className="flex flex-col gap-3">
                        {/* <h3 className="text-sm font-medium text-grey-950">{review.}</h3> */}
                        <p className="text-base text-grey-700 font-normal">{review.comment}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-grey-800 font-normal">Reviewed by {`${review.user.firstName} ${review.user.lastName}`}</p>
                          {review.user.verified && (
                            <div className="flex gap-1 items-center">
                              <TickCircle size="16" className="text-success-600" variant="Bold" />
                              <p className="text-xs text-grey-800 font-normal">Verified</p>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-grey-800 font-normal">{formatDate(new Date(review.createdAt), "MMMM dd, yyyy")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Comments */}
              {/* <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-6 py-6 px-4 border border-grey-100 rounded-lg">
                  <div className="flex gap-1 items-center">
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium text-grey-950">I love the product</h3>
                    <p className="text-base text-grey-700 font-normal">
                      Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque
                      lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla sodales.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-grey-800 font-normal">Reviewed by [Buyer Name]</p>
                      <div className="flex gap-1 items-center">
                        <TickCircle size="16" className="text-success-600" variant="Bold" />
                        <p className="text-xs text-grey-800 font-normal">Verified</p>
                      </div>
                    </div>
                    <p className="text-xs text-grey-800 font-normal">May 20, 2025</p>
                  </div>
                </div>
                <div className="flex flex-col gap-6 py-6 px-4 border border-grey-100 rounded-lg">
                  <div className="flex gap-1 items-center">
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium text-grey-950">I love the product</h3>
                    <p className="text-base text-grey-700 font-normal">
                      Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque
                      lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla sodales.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-grey-800 font-normal">Reviewed by Oluwafemi Oladipo</p>
                      <div className="flex gap-1 items-center">
                        <TickCircle size="16" className="text-success-600" variant="Bold" />
                        <p className="text-xs text-grey-800 font-normal">Verified</p>
                      </div>
                    </div>
                    <p className="text-xs text-grey-800 font-normal">May 20, 2025</p>
                  </div>
                </div>
                <div className="flex flex-col gap-6 py-6 px-4 border border-grey-100 rounded-lg">
                  <div className="flex gap-1 items-center">
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                    <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium text-grey-950">I love the product</h3>
                    <p className="text-base text-grey-700 font-normal">
                      Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque
                      lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla sodales.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-grey-800 font-normal">Reviewed by Oluwafemi Oladipo</p>
                      <div className="flex gap-1 items-center">
                        <TickCircle size="16" className="text-success-600" variant="Bold" />
                        <p className="text-xs text-grey-800 font-normal">Verified</p>
                      </div>
                    </div>
                    <p className="text-xs text-grey-800 font-normal">May 20, 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center text-grey-400 text-sm cursor-pointer">
                <p>More</p>
                <ArrowDown2 size="16" />
              </div>
            </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading Product</h1>
  );
};

export default ProductDetailsPage;
