// src/pages/ProductPage.tsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { featuredProducts, recentProducts, bestSellers } from "@/data/database";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowDown2, ArrowLeft, ArrowRight2, Heart, Send2, Star1, TickCircle } from "iconsax-reactjs";
import ProductSection from "@/components/custom/ProductSection";
import DeliveryAddress from "@/components/custom/DeliveryAddress";

const allProducts = [...featuredProducts, ...recentProducts, ...bestSellers];

const ProductPage = () => {
  const { id } = useParams();
  const productId = id ? parseInt(id, 10) : null;
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return <h2 className="p-6 text-xl">Product not found</h2>;
  }

  // Tab
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "description", label: "Product Description" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
    { id: "store", label: "Store" },
  ];

  return (
    <div className="w-full">
      <div className="bg-[#F6F6F699] w-full p-6 rounded-lg flex justify-between items-center mb-6">
        <Link to="/" className="flex items-center gap-4">
          <ArrowLeft size="20" />
          <h2 className="text-lg capitalize font-medium text-grey-950">{product.name}</h2>
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-primary-700 bg-primary-50 border border-primary-500 text-base font-medium py-3 px-6 rounded-full">Add to Cart</button>
          <button className="text-white bg-primary-500 text-base font-medium py-3 px-6 rounded-full">Buy Now</button>
        </div>
      </div>

      <div className="w-full flex justify-between gap-6 mb-14">
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {/* Product Name */}
                  <h1 className="text-xl text-grey-700 font-normal">iPhone 16 Lorem ipsum dolor sit amet</h1>
                  <div className="flex items-center gap-3">
                    {/* Price */}
                    <p className="text-grey-950 font-medium text-xl">₦1,200,000.00</p>

                    {/* Discount */}
                    <span className="bg-grey-50 py-2 px-4 rounded-full text-sm font-normal text-grey-900">30% Off</span>
                  </div>

                  {/* Product State */}
                  <div className="flex items-center gap-3">
                    <button className="py-2 px-3 rounded-full text-[11px] font-normal text-success-600 border border-success-600 bg-success-50">Available in stock</button>
                    <button className="py-2 px-3 rounded-full text-[11px] font-normal text-primary-600 border border-primary-600 bg-primary-50">Limited Stock</button>
                    <button className="py-2 px-3 rounded-full text-[11px] font-normal text-error-600 border border-error-600 bg-error-50">Out of Stock</button>
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
                      <span className="text-grey-800 text-xs font-normal">[92 Ratings] | [55 Sold]</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-grey-950 font-normal">Quantity</p>
                  {/* Qunatity Increment */}
                  <div className="flex gap-1 items-center">
                    <div className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium cursor-pointer">-</div>
                    <div className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium cursor-pointer">1</div>
                    <div className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium cursor-pointer">+</div>
                  </div>
                </div>
              </div>
              {/* Product Favorite */}
              <div className="flex gap-4 flex-col">
                <div className="flex items-center gap-2 text-grey-600 text-sm">
                  <Send2 className="cursor-pointer" />
                  <p>Share this product</p>
                </div>
                <div className="flex items-center gap-2 text-grey-600 text-sm">
                  <Heart className="cursor-pointer" />
                  <p>Save item</p>
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
                  className={`px-2 pb-3 rounded-t-lg text-sm font-normal transition-colors ${activeTab === tab.id ? "bg-white text-grey-900 border-b-2 border-b-primary-500" : "text-grey-500"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white p-1 mt-[-1px]">
              {activeTab === "description" && (
                <div className="flex flex-col gap-4">
                  <p className="text-base/7 text-grey-700">
                    Lorem ipsum dolor sit amet consectetur. Amet tempor id suspendisse id sed nibh felis ullamcorper in. Quis sit urna ornare id mattis praesent purus diam pretium. Vestibulum amet
                    metus nec donec. Felis sed sodales risus donec risus proin. Velit in quisque diam libero elementum. Lectus at nunc ut mi ornare. Vitae volutpat aliquam erat sed quam consequat.
                    Viverra blandit at penatibus diam. Eu odio vitae nunc urna adipiscing risus mi sed a. Sit orci enim rhoncus ut consectetur. Dapibus congue ut gravida vitae egestas hac. Nisl quis
                    neque nibh augue in faucibus. Nec leo sit elementum leo magnis iaculis netus ultrices. <br /> Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit
                    faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla
                    sodales.
                  </p>
                  <div className="flex gap-2 items-center text-grey-400 text-sm">
                    <p>More</p>
                    <ArrowDown2 size="16" />
                  </div>
                </div>
              )}
              {activeTab === "features" && (
                <div className="flex flex-col gap-4">
                  <p className="text-base/7 text-grey-700">
                    Lorem ipsum dolor sit amet consectetur. Amet tempor id suspendisse id sed nibh felis ullamcorper in. Quis sit urna ornare id mattis praesent purus diam pretium. Vestibulum amet
                    metus nec donec. Felis sed sodales risus donec risus proin. Velit in quisque diam libero elementum. Lectus at nunc ut mi ornare. Vitae volutpat aliquam erat sed quam consequat.
                    Viverra blandit at penatibus diam. Eu odio vitae nunc urna adipiscing risus mi sed a. Sit orci enim rhoncus ut consectetur. Dapibus congue ut gravida vitae egestas hac. Nisl quis
                    neque nibh augue in faucibus. Nec leo sit elementum leo magnis iaculis netus ultrices. <br /> Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit
                    faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla
                    sodales.
                  </p>
                  <div className="flex gap-2 items-center text-grey-400 text-sm">
                    <p>More</p>
                    <ArrowDown2 size="16" />
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="flex flex-col gap-4">
                  <p className="text-base/7 text-grey-700">
                    Lorem ipsum dolor sit amet consectetur. Amet tempor id suspendisse id sed nibh felis ullamcorper in. Quis sit urna ornare id mattis praesent purus diam pretium. Vestibulum amet
                    metus nec donec. Felis sed sodales risus donec risus proin. Velit in quisque diam libero elementum. Lectus at nunc ut mi ornare. Vitae volutpat aliquam erat sed quam consequat.
                    Viverra blandit at penatibus diam. Eu odio vitae nunc urna adipiscing risus mi sed a. Sit orci enim rhoncus ut consectetur. Dapibus congue ut gravida vitae egestas hac. Nisl quis
                    neque nibh augue in faucibus. Nec leo sit elementum leo magnis iaculis netus ultrices. <br /> Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit
                    faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla
                    sodales.
                  </p>
                  <div className="flex gap-2 items-center text-grey-400 text-sm">
                    <p>More</p>
                    <ArrowDown2 size="16" />
                  </div>
                </div>
              )}
              {activeTab === "store" && (
                <div className="flex flex-col gap-4">
                  <p className="text-base/7 text-grey-700">
                    Lorem ipsum dolor sit amet consectetur. Amet tempor id suspendisse id sed nibh felis ullamcorper in. Quis sit urna ornare id mattis praesent purus diam pretium. Vestibulum amet
                    metus nec donec. Felis sed sodales risus donec risus proin. Velit in quisque diam libero elementum. Lectus at nunc ut mi ornare. Vitae volutpat aliquam erat sed quam consequat.
                    Viverra blandit at penatibus diam. Eu odio vitae nunc urna adipiscing risus mi sed a. Sit orci enim rhoncus ut consectetur. Dapibus congue ut gravida vitae egestas hac. Nisl quis
                    neque nibh augue in faucibus. Nec leo sit elementum leo magnis iaculis netus ultrices. <br /> Quam lobortis ultrices amet ipsum sem pharetra risus erat at. Dignissim urna felis sit
                    faucibus quis. Lorem facilisis quis arcu et. Tincidunt scelerisque interdum scelerisque lectus nulla nibh non quam faucibus. Et arcu duis ac orci turpis nullam ut dictumst. Nulla
                    sodales.
                  </p>
                  <div className="flex gap-2 items-center text-grey-400 text-sm">
                    <p>More</p>
                    <ArrowDown2 size="16" />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Product Features */}
          <div className="bg-[#FCFCFC] rounded-lg py-5 px-4 flex flex-col gap-4">
            <div>
              <h1 className="text-base font-medium text-grey-950">Features</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="py-4 px-3 border-b border-b-grey-100 rounded-lg">
                <p className="text-grey-700 text-base font-normal">Quam lobortis ultrices amet ipsum sem pharetra</p>
              </div>
              <div className="py-4 px-3 border-b border-b-grey-100 rounded-lg">
                <p className="text-grey-700 text-base font-normal">
                  Lorem ipsum dolor sit amet consectetur. Amet tempor id suspendisse id sed nibh felis ullamcorper in. Quis sit urna ornare id mattis praesent purus diam pretium.
                </p>
              </div>
              <div className="py-4 px-3 border-b border-b-grey-100 rounded-lg">
                <p className="text-grey-700 text-base font-normal">Quam lobortis ultrices amet ipsum sem pharetra</p>
              </div>
              <div className="py-4 px-3 border-b border-b-grey-100 rounded-lg">
                <p className="text-grey-700 text-base font-normal">
                  Lorem ipsum dolor sit amet consectetur. Amet tempor id suspendisse id sed nibh felis ullamcorper in. Quis sit urna ornare id mattis praesent purus diam pretium.
                </p>
              </div>
              <div className="py-4 px-3 border-b border-b-grey-100 rounded-lg">
                <p className="text-grey-700 text-base font-normal">Quam lobortis ultrices amet ipsum sem pharetra</p>
              </div>
            </div>
            <div className="flex gap-2 items-center text-grey-400 text-sm">
              <p>More</p>
              <ArrowDown2 size="16" />
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
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                </div>
                <div className="w-[346px] h-[12px] bg-grey-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 w-[60%]"></div>
                </div>
                <div>
                  <p className="text-sm font-normal">30</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                </div>
                <div className="w-[346px] h-[12px] bg-grey-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 w-[60%]"></div>
                </div>
                <div>
                  <p className="text-sm font-normal">30</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                </div>
                <div className="w-[346px] h-[12px] bg-grey-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 w-[60%]"></div>
                </div>
                <div>
                  <p className="text-sm font-normal">30</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                </div>
                <div className="w-[346px] h-[12px] bg-grey-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 w-[60%]"></div>
                </div>
                <div>
                  <p className="text-sm font-normal">30</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                  <Star1 className="text-primary-500 cursor-pointer" size="16" variant="Bold" />
                </div>
                <div className="w-[346px] h-[12px] bg-grey-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 w-[60%]"></div>
                </div>
                <div>
                  <p className="text-sm font-normal">30</p>
                </div>
              </div>
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
            <div className="flex gap-2 items-center text-grey-400 text-sm">
              <p>More</p>
              <ArrowDown2 size="16" />
            </div>
          </div>
        </div>
        <div className="bg-[#F6F6F6] rounded-lg w-1/3 h-[702px] py-5 px-5">
          <div className="flex items-center justify-between pb-5 border-b border-b-grey-100">
            <h1 className="text-base font-medium text-grey-950">Vendor</h1>
            <div className="flex items-center gap-2 text-sm">
              <p>[Store Name]</p>
              <ArrowRight2 size="16" />
            </div>
          </div>

          <DeliveryAddress />

          <div className="flex flex-col gap-4 py-5 border-b border-b-grey-100">
            <h1 className="text-base font-medium text-grey-950">Delivery Information</h1>
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm text-grey-900">Delivery Fee</p>
              <p className="font-normal text-xs text-grey-950">[₦0.00]</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm text-grey-900">Delivery Date</p>
              <p className="font-normal text-xs text-grey-950">[May 24 - May 30]</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-5">
            <div className="gap-4 items-center flex">
              <div className="bg-grey-600 h-14 w-14 rounded-sm"></div>
              <p className="text-sm font-medium text-grey-900">[Product Name]</p>
            </div>
            <p className="font-normal text-xs text-grey-950">x[1]</p>
          </div>
        </div>
      </div>

      <ProductSection title="Based on your recent visits" products={recentProducts} />
      <ProductSection title="Best Sellers" products={bestSellers} />
    </div>
  );
};

export default ProductPage;
