import React, { useState, useRef } from "react";
import {
  Add,
  Box,
  CloseSquare,
  Trash,
  Edit,
  Eye,
  Lock,
  Unlock,
} from "iconsax-reactjs";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const statusColors: Record<string, string> = {
  Active: "bg-success-50 text-success-700",
  "Under Review": "bg-primary-50 text-primary-600",
  Inactive: "bg-error-50 text-error-700",
  Rejected: "bg-error-700 text-white",
};

const ProductsPage = () => {
  const navigate = useNavigate();

  // Mock data so the table shows up now
  const [products, setProducts] = useState<any[]>([
    { id: 1, name: "Wireless Headphones", price: 25000, stock: 12, status: "Active" },
    { id: 2, name: "Smart Watch", price: 40000, stock: 5, status: "Under Review" },
    { id: 3, name: "Laptop Bag", price: 15000, stock: 0, status: "Inactive" },
    { id: 4, name: "Bluetooth Speaker", price: 18000, stock: 30, status: "Rejected" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [features, setFeatures] = useState<string[]>([""]);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Tabs
  const tabs = ["All", "Low Stock", "Out of Stock", "Drafts"];
  const [activeTab, setActiveTab] = useState("All");

  // Handle feature input changes
  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploaded = Array.from(e.target.files);
      setImages((prev) => [...prev, ...uploaded].slice(0, 5)); // max 5 images
    }
  };

  const removeImage = (index: number) =>
    setImages(images.filter((_, i) => i !== index));

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "All") return true;
    if (activeTab === "Low Stock") return product.stock > 0 && product.stock <= 5;
    if (activeTab === "Out of Stock") return product.stock === 0;
    if (activeTab === "Drafts") return product.status === "Draft";
    return true;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">My Products</h1>
          <p className="text-grey-500 text-sm font-normal">
            Manage your product listings and reviews
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-500 rounded-full flex gap-2 items-center text-white text-base font-normal py-3 px-6"
        >
          <Add />
          <p>Add Product</p>
        </button>
      </section>

      {/* Tabs */}
      <section className="py-4 px-6 bg-grey-50 rounded-lg flex items-center gap-3 mt-4">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-1 pb-3 text-sm font-normal cursor-pointer ${activeTab === tab
              ? "text-grey-900 border-b-2 border-b-primary-500"
              : "text-grey-500"
              }`}
          >
            {tab}
          </p>
        ))}
      </section>

      {/* Main Content */}
      {filteredProducts.length === 0 ? (
        <section className="h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-grey-100 rounded-full p-6">
              <Box size="64" color="#B0B0B0" />
            </div>
            <p className="text-grey-900 font-normal text-base">
              No products found in <span className="font-medium">{activeTab}</span>
            </p>
            <p className="text-grey-400 font-normal text-xs">
              Try switching tabs or add a new product.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-none flex items-center gap-2 text-sm text-grey-950 font-normal"
            >
              <Add />
              <p>Add Product</p>
            </button>
          </div>
        </section>
      ) : (
        <section className="mt-6 flex gap-6 flex-col w-full">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-grey-900 text-white font-medium text-sm capitalize">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Available Stock</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y bg-grey-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-grey-200">
                  <td className="px-6 py-4 text-grey-900 text-sm">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-grey-900 text-sm">
                    ₦{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {product.stock > 0 ? (
                      <span className="flex items-center gap-2 text-xs font-normal">
                        <p>{product.stock}</p>
                        {product.stock <= 20 && (
                          <p className="bg-primary-50 text-primary-600 px-2 py-1 rounded-sm">
                            {product.stock <= 5 ? "Low" : "In Stock"}
                          </p>
                        )}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p>0</p>
                        <span className="text-error-600 bg-error-50 px-2 py-1 rounded-sm text-xs">
                          Out of stock
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block p-2 rounded-sm text-xs font-normal ${statusColors[product.status] ||
                        "bg-grey-100 text-grey-700"
                        }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-grey-100">
                          <MoreVertical size="20" className="text-grey-600" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2 rounded-lg shadow-lg border border-grey-200">
                        <div className="flex flex-col">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                          >
                            <Edit size="16" /> Edit
                          </button>
                          <button
                            onClick={() => navigate(`/vendor/products/${product.id}`)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                          >
                            <Eye size="16" /> View Product
                          </button>
                          {product.status === "Active" && (
                            <button
                              onClick={() => {
                                setProducts(prev =>
                                  prev.map(p =>
                                    p.id === product.id ? { ...p, status: "Inactive" } : p
                                  )
                                );
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                            >
                              <Lock size="16" /> Deactivate
                            </button>
                          )}
                          {product.status === "Inactive" && (
                            <button
                              onClick={() => {
                                setProducts(prev =>
                                  prev.map(p =>
                                    p.id === product.id ? { ...p, status: "Active" } : p
                                  )
                                );
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                            >
                              <Unlock size="16" /> Activate
                            </button>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Add Product Modal (scrollable, unchanged) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg relative p-6 flex flex-col gap-6 w-[748px] max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium">Add Product</h2>
                <p className="text-sm text-grey-500">
                  Fill in the details to add a new product.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedProduct(null); // clear edit state
                }}
              >
                <CloseSquare size="24" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct?.name || ""}
                    className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">Category *</label>
                  <select className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full">
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="books">Books</option>
                    <option value="home">Home & Living</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">Price *</label>
                  <input
                    type="text"
                    className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full"
                    placeholder="₦"
                  />
                </div>
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">
                    Discount (optional)
                  </label>
                  <div className="flex items-center justify-between border border-grey-100 rounded-full px-3">
                    <input
                      type="text"
                      className="flex-1 text-base text-grey-300 py-2 outline-none"
                      placeholder="0"
                    />
                    <span className="text-grey-400">%</span>
                  </div>
                </div>
              </div>
              <div className="w-full gap-2 flex flex-col">
                <label className="text-sm text-grey-800">
                  Stock Quantity *
                </label>
                <input
                  type="text"
                  className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full"
                  placeholder="0"
                />
              </div>
              <div className="w-full gap-2 flex flex-col">
                <label className="text-sm text-grey-800">Description *</label>
                <textarea
                  className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-2xl"
                  rows={5}
                  placeholder="Product description"
                ></textarea>
              </div>

              {/* Features */}
              <div className="w-full gap-4 flex flex-col">
                <label className="text-sm text-grey-800">
                  Product Features (optional)
                </label>
                {features.map((feature, index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="w-full border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full"
                      placeholder={`Product feature ${index + 1}`}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-400"
                      >
                        <CloseSquare size="20" />
                      </button>
                    )}
                  </div>
                ))}
                <div
                  onClick={addFeature}
                  className="flex gap-2 items-center text-primary-600 text-sm cursor-pointer"
                >
                  <Add />
                  <p>Add feature</p>
                </div>
              </div>

              {/* Add Photo */}
              <div className="bg-grey-50 p-3 rounded-xl w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-base">Add Photo *</h1>
                  <p className="text-sm text-grey-500">
                    Add at least 1 photo. You can add up to 5 photos.
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-2xl overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt="uploaded"
                        className="w-full h-full object-cover"
                      />
                      <div
                        onClick={() => removeImage(index)}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition"
                      >
                        <Trash size="24" color="#fff" />
                      </div>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white cursor-pointer border border-grey-100 rounded-2xl w-24 h-24 flex justify-center items-center"
                    >
                      <Add color="#292D32" />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-none text-sm text-grey-700"
              >
                Save to draft
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsReviewModalOpen(true);
                }}
                className="px-6 py-3 rounded-full bg-primary-500 text-white text-sm"
              >
                Submit for review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal (unchanged) */}
      {isReviewModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-medium text-center">
              Your product is reviewed
            </h2>
            <button
              onClick={() => {
                setIsReviewModalOpen(false);
                setIsModalOpen(true);
              }}
              className="px-6 py-3 rounded-full bg-primary-500 text-white text-sm mx-auto"
            >
              Edit details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
