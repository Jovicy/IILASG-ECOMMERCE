import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star1,
  Send2,
  Heart,
  ArrowDown2,
  TickCircle,
  ArrowLeft,
} from "iconsax-reactjs";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const product = {
    id,
    name: "Wireless Headphones",
    price: 25000,
    stock: 12,
    description:
      "High-quality wireless headphones with noise cancellation and 20 hours of playtime.",
    features: ["Bluetooth 5.0", "Noise Cancellation", "20h Battery Life"],
    images: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400",
    ],
  };

  const reviews = [
    {
      id: 1,
      rating: 5,
      title: "I love the product",
      comment: "Quam lobortis ultrices amet ipsum sem pharetra risus erat at...",
      reviewer: "Oluwafemi Oladipo",
      verified: true,
      date: "May 20, 2025",
    },
    {
      id: 2,
      rating: 4,
      title: "Good but could improve",
      comment: "Velit in quisque diam libero elementum. Lectus at nunc ut mi ornare...",
      reviewer: "Chika Daniels",
      verified: true,
      date: "June 5, 2025",
    },
  ];


  // ✅ Fix: add state for tabs
  const [activeTab, setActiveTab] = useState("description");

  // ✅ Fix: define available tabs
  const tabs = [
    { id: "description", label: "Description" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
  ];

  // ✅ Fix: quantity logic
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="w-full p-6">
      <Link to="/vendor/products" className="flex items-center gap-4 mb-12">
        <ArrowLeft size="20" />
        <h1 className="text-lg capitalize font-medium text-grey-950">[Product Name]</h1>
      </Link>
      <div className="w-2/3 flex flex-col gap-8">
        <div className="flex gap-6">
          {/* Product Picture */}
          <div className="w-[356px] h-[320px] bg-grey-500 rounded-lg p-4 flex items-end">
            <div className="flex gap-2">
              <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
              <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
              <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
              <div className="h-14 w-14 rounded-sm bg-grey-100"></div>
            </div>
          </div>
          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                {/* Product Name */}
                <h1 className="text-xl text-grey-700 font-normal">
                  iPhone 16 Lorem ipsum dolor sit amet
                </h1>
                <div className="flex items-center gap-3">
                  {/* Price */}
                  <p className="text-grey-950 font-medium text-xl">
                    ₦1,200,000.00
                  </p>

                  {/* Discount */}
                  <span className="bg-grey-50 py-2 px-4 rounded-full text-sm font-normal text-grey-900">
                    30% Off
                  </span>
                </div>

                {/* Product State */}
                <div className="flex items-center gap-3">
                  {product.stock > 10 && (
                    <button className="py-2 px-3 rounded-full text-[11px] font-normal text-success-600 border border-success-600 bg-success-50">
                      Available in stock
                    </button>
                  )}
                  {product.stock > 0 && product.stock <= 10 && (
                    <button className="py-2 px-3 rounded-full text-[11px] font-normal text-primary-600 border border-primary-600 bg-primary-50">
                      Limited Stock
                    </button>
                  )}
                  {product.stock === 0 && (
                    <button className="py-2 px-3 rounded-full text-[11px] font-normal text-error-600 border border-error-600 bg-error-50">
                      Out of Stock
                    </button>
                  )}
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
                      [92 Ratings] | [55 Sold]
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm text-grey-950 font-normal">Quantity</p>
                {/* Qunatity Increment */}
                <div className="flex gap-1 items-center">
                  <button
                    onClick={decreaseQty}
                    className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium"
                  >
                    -
                  </button>
                  <div className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQty}
                    className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium"
                  >
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

        <div className="flex flex-col gap-4">
          {/* Tab Navigation */}
          <div className="flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 pb-3 rounded-t-lg text-sm font-normal transition-colors ${activeTab === tab.id
                  ? "bg-white text-grey-900 border-b-2 border-b-primary-500"
                  : "text-grey-500"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white p-1 mt-[-1px]">
            {activeTab === "description" && (
              <div className="flex flex-col gap-4">
                <p className="text-base/7 text-grey-700">
                  Lorem ipsum dolor sit amet consectetur. Amet tempor id
                  suspendisse id sed nibh felis ullamcorper in. Quis sit urna
                  ornare id mattis praesent purus diam pretium. Vestibulum amet
                  metus nec donec. Felis sed sodales risus donec risus proin.
                  Velit in quisque diam libero elementum. Lectus at nunc ut mi
                  ornare. Vitae volutpat aliquam erat sed quam consequat.
                  Viverra blandit at penatibus diam. Eu odio vitae nunc urna
                  adipiscing risus mi sed a. Sit orci enim rhoncus ut
                  consectetur. Dapibus congue ut gravida vitae egestas hac. Nisl
                  quis neque nibh augue in faucibus. Nec leo sit elementum leo
                  magnis iaculis netus ultrices. <br /> Quam lobortis ultrices amet
                  ipsum sem pharetra risus erat at. Dignissim urna felis sit
                  faucibus quis. Lorem facilisis quis arcu et. Tincidunt
                  scelerisque interdum scelerisque lectus nulla nibh non quam
                  faucibus. Et arcu duis ac orci turpis nullam ut dictumst.
                  Nulla sodales.
                </p>
                <div className="flex gap-2 items-center text-grey-400 text-sm cursor-pointer">
                  <p>More</p>
                  <ArrowDown2 size="16" />
                </div>
              </div>
            )}
            {activeTab === "features" && (
              <div className="flex flex-col gap-4">
                <p className="text-base/7 text-grey-700">
                  Lorem ipsum dolor sit amet consectetur. Amet tempor id
                  suspendisse id sed nibh felis ullamcorper in. Quis sit urna
                  ornare id mattis praesent purus diam pretium. Vestibulum amet
                  metus nec donec. Felis sed sodales risus donec risus proin.
                  Velit in quisque diam libero elementum. Lectus at nunc ut mi
                  ornare. Vitae volutpat aliquam erat sed quam consequat.
                  Viverra blandit at penatibus diam. Eu odio vitae nunc urna
                  adipiscing risus mi sed a. Sit orci enim rhoncus ut
                  consectetur. Dapibus congue ut gravida vitae egestas hac. Nisl
                  quis neque nibh augue in faucibus. Nec leo sit elementum leo
                  magnis iaculis netus ultrices. <br /> Quam lobortis ultrices amet
                  ipsum sem pharetra risus erat at. Dignissim urna felis sit
                  faucibus quis. Lorem facilisis quis arcu et. Tincidunt
                  scelerisque interdum scelerisque lectus nulla nibh non quam
                  faucibus. Et arcu duis ac orci turpis nullam ut dictumst.
                  Nulla sodales.
                </p>
                <div className="flex gap-2 items-center text-grey-400 text-sm cursor-pointer">
                  <p>More</p>
                  <ArrowDown2 size="16" />
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="flex flex-col gap-4">
                <p className="text-base/7 text-grey-700">
                  Lorem ipsum dolor sit amet consectetur. Amet tempor id
                  suspendisse id sed nibh felis ullamcorper in. Quis sit urna
                  ornare id mattis praesent purus diam pretium. Vestibulum amet
                  metus nec donec. Felis sed sodales risus donec risus proin.
                  Velit in quisque diam libero elementum. Lectus at nunc ut mi
                  ornare. Vitae volutpat aliquam erat sed quam consequat.
                  Viverra blandit at penatibus diam. Eu odio vitae nunc urna
                  adipiscing risus mi sed a. Sit orci enim rhoncus ut
                  consectetur. Dapibus congue ut gravida vitae egestas hac. Nisl
                  quis neque nibh augue in faucibus. Nec leo sit elementum leo
                  magnis iaculis netus ultrices. <br /> Quam lobortis ultrices amet
                  ipsum sem pharetra risus erat at. Dignissim urna felis sit
                  faucibus quis. Lorem facilisis quis arcu et. Tincidunt
                  scelerisque interdum scelerisque lectus nulla nibh non quam
                  faucibus. Et arcu duis ac orci turpis nullam ut dictumst.
                  Nulla sodales.
                </p>
                <div className="flex gap-2 items-center text-grey-400 text-sm cursor-pointer">
                  <p>More</p>
                  <ArrowDown2 size="16" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Features */}
        <div className="bg-[#FCFCFC] rounded-lg py-5 px-4 flex flex-col gap-4">
          <h1 className="text-base font-medium text-grey-950">Features</h1>
          <div className="flex flex-col gap-2">
            {product.features.map((feature, i) => (
              <div
                key={i}
                className="py-4 px-3 border-b border-b-grey-100 rounded-lg"
              >
                <p className="text-grey-700 text-base font-normal">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Ratings Overall */}
        <div className="flex flex-col gap-6">
          <div className="border-b border-b-grey-100 pb-6">
            <h1 className="text-base font-medium text-grey-950">Reviews</h1>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-semibold">4.0</h1>
            <div className="flex gap-1 flex-col">
              <div className="flex gap-1 items-center">
                <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
              </div>
              <p className="text-xs font-normal text-grey-800">([92 Ratings])</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-6 py-6 px-4 border border-grey-100 rounded-lg"
              >
                <div className="flex gap-1 items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star1
                      key={i}
                      className="text-primary-500 cursor-pointer"
                      size="16"
                      variant="Bold"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-medium text-grey-950">{review.title}</h3>
                  <p className="text-base text-grey-700 font-normal">{review.comment}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-grey-800 font-normal">
                      Reviewed by {review.reviewer}
                    </p>
                    {review.verified && (
                      <div className="flex gap-1 items-center">
                        <TickCircle size="16" className="text-success-600" variant="Bold" />
                        <p className="text-xs text-grey-800 font-normal">Verified</p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-grey-800 font-normal">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Comments */}
        <div className="flex flex-col gap-4">
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
                <p className="text-base text-grey-700 font-normal">Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla sodales.</p>
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
                <p className="text-base text-grey-700 font-normal">Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla sodales.</p>
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
                <p className="text-base text-grey-700 font-normal">Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla sodales.</p>
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
