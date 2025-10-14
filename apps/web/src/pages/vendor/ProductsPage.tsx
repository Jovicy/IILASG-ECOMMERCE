import React, { useState, useRef, useEffect } from "react";
import { Add, Box, CloseSquare, Trash, Edit, Eye, Lock, Unlock } from "iconsax-reactjs";
import { MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useGetAllCategories } from "@/hooks/category";
import { useCreateProduct, useGetMyProducts, useUpdateProduct } from "@/hooks/product";
import { Image, Product } from "@/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { fetchWrapper } from "@/api/fetchWrapper";
import { formatNaira } from "@/lib/utils";

enum ProductStatus {
  ACTIVE = "ACTIVE",
  UNDER_REVIEW = "UNDER_REVIEW",
  INACTIVE = "INACTIVE",
  REJECTED = "REJECTED",
}

const statusColors: Record<ProductStatus, string> = {
  [ProductStatus.ACTIVE]: "bg-success-50 text-success-700",
  [ProductStatus.UNDER_REVIEW]: "bg-primary-50 text-primary-600",
  [ProductStatus.INACTIVE]: "bg-error-50 text-error-700",
  [ProductStatus.REJECTED]: "bg-error-700 text-white",
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: upadatProduct } = useUpdateProduct();
  const { data: categories } = useGetAllCategories();
  const { data, isFetching } = useGetMyProducts();

  const products = data?.data ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [features, setFeatures] = useState<string[]>([""]);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploaded = Array.from(e.target.files);
      setImages((prev) => [...prev, ...uploaded].slice(0, 5)); // max 5 images
    }
  };

  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));
  const handleRemoveUploadedImage = (id: string) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id));
    setRemovedImageIds([...removedImageIds, id]);
  };

  const formatStatus = (status: ProductStatus) => {
    return status
      .toLowerCase() // "under_review"
      .replace("_", " ") // "under review"
      .replace(/\b\w/g, (c) => c.toUpperCase()); // "Under Review"
  };

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "All") return true;
    if (activeTab === "Low Stock") return product.quantity > 0 && product.quantity <= 20;
    if (activeTab === "Out of Stock") return product.quantity === 0;
    if (activeTab === "Drafts") return product.stockStatus === "Draft";
    return true;
  });

  useEffect(() => {
    if (selectedProduct) {
      setFeatures(selectedProduct.features || []);
      setUploadedImages(selectedProduct.images || []);
    } else {
      setUploadedImages([]);
      setFeatures([]);
    }
  }, [selectedProduct]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">My Products</h1>
          <p className="text-grey-500 text-sm font-normal">Manage your product listings and reviews</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary-500 rounded-full flex gap-2 items-center text-white text-base font-normal py-3 px-6">
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
            className={`p-1 pb-3 text-sm font-normal cursor-pointer ${activeTab === tab ? "text-grey-900 border-b-2 border-b-primary-500" : "text-grey-500"}`}>
            {tab}
          </p>
        ))}
      </section>

      {/* Main Content */}
      {!isFetching ? (
        filteredProducts.length === 0 ? (
          <section className="h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-grey-100 rounded-full p-6">
                <Box size="64" color="#B0B0B0" />
              </div>
              <p className="text-grey-900 font-normal text-base">
                No products found in <span className="font-medium">{activeTab}</span>
              </p>
              <p className="text-grey-400 font-normal text-xs">Try switching tabs or add a new product.</p>
              <button onClick={() => setIsModalOpen(true)} className="bg-none flex items-center gap-2 text-sm text-grey-950 font-normal">
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
                    <td className="px-6 py-4 text-grey-900 text-sm">{product.name}</td>
                    <td className="px-6 py-4 text-grey-900 text-sm">{formatNaira(product.price)}</td>
                    <td className="px-6 py-4 text-sm">
                      {product.quantity > 0 ? (
                        <span className="flex items-center gap-2 text-xs font-normal">
                          <p>{product.quantity}</p>
                          {product.quantity <= 20 && <p className="bg-primary-50 text-primary-600 px-2 py-1 rounded-sm">Low</p>}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p>0</p>
                          <span className="text-error-600 bg-error-50 px-2 py-1 rounded-sm text-xs">Out of stock</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block p-2 rounded-sm text-xs font-normal ${statusColors[product.status] || "bg-grey-100 text-grey-700"}`}>
                        {formatStatus(product.status as ProductStatus)}
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
                              className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md">
                              <Edit size="16" /> Edit
                            </button>
                            <button onClick={() => navigate(`/vendor/products/${product.id}`)} className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md">
                              <Eye size="16" /> View Product
                            </button>

                            {product.status === "Active" ? (
                              <button
                                // onClick={() => setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status: "Inactive" } : p)))}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md">
                                <Lock size="16" /> Deactivate
                              </button>
                            ) : (
                              <button
                                // onClick={() => setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status: "Active" } : p)))}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md">
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
        )
      ) : (
        <h1>Loading...</h1>
      )}

      {/* Add Product Modal (scrollable, updated with form validation and console logging) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-white rounded-lg shadow-lg relative p-6 flex flex-col gap-6 w-[748px] max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium">{selectedProduct ? "Edit Product" : "Add Product"}</h2>
                <p className="text-sm text-grey-500">Fill in the details to add a new product.</p>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedProduct(null);
                }}>
                <CloseSquare size="24" />
              </button>
            </div>

            {/* Form Fields */}
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const payload = {
                  name: e.currentTarget.productName.value,
                  description: e.currentTarget.description.value,
                  quantity: e.currentTarget.stock.value,
                  price: e.currentTarget.price.value,
                  categoryId: e.currentTarget.categoryId.value,
                  features,
                  discount: e.currentTarget.discount.value,
                  images: images,
                };

                if (!selectedProduct) {
                  createProduct(payload, {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["my-products"] });
                      setIsModalOpen(false);
                      setFeatures([]);
                      setImages([]);
                      setIsReviewModalOpen(true);
                    },
                    onError: (err) => {
                      console.error("❌ Error creating product:", err);
                      alert("Failed to create product.");
                    },
                  });
                } else {
                  upadatProduct(
                    { id: selectedProduct.id, payload: { ...payload, removedImageIds: removedImageIds } },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["my-products"] });
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                        setFeatures([]);
                        setImages([]);
                      },
                      onError: (err) => {
                        console.error("❌ Error updating product:", err);
                        alert("Failed to update product.");
                      },
                    }
                  );
                }
              }}
              className="space-y-4">
              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">Product Name *</label>
                  <input
                    name="productName"
                    required
                    type="text"
                    className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full"
                    placeholder="Enter product name"
                    defaultValue={selectedProduct?.name || ""}
                  />
                </div>
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">Category *</label>
                  <select name="categoryId" required className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full" defaultValue={selectedProduct?.categoryId || ""}>
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">Price *</label>
                  <input name="price" required type="number" className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full" placeholder="₦" defaultValue={selectedProduct?.price} />
                </div>
                <div className="w-1/2 gap-2 flex flex-col">
                  <label className="text-sm text-grey-800">Discount (optional)</label>
                  <div className="flex items-center justify-between border border-grey-100 rounded-full px-3">
                    <input name="discount" type="number" className="flex-1 text-base text-grey-300 py-2 outline-none" placeholder="0" defaultValue={selectedProduct?.discount} />
                    <span className="text-grey-400">%</span>
                  </div>
                </div>
              </div>

              <div className="w-full gap-2 flex flex-col">
                <label className="text-sm text-grey-800">Stock Quantity *</label>
                <input name="stock" required type="number" className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full" placeholder="0" defaultValue={selectedProduct?.quantity} />
              </div>

              <div className="w-full gap-2 flex flex-col">
                <label className="text-sm text-grey-800">Description *</label>
                <textarea
                  name="description"
                  required
                  className="border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-2xl"
                  rows={5}
                  placeholder="Product description"
                  defaultValue={selectedProduct?.description || ""}></textarea>
              </div>

              {/* Features Section (unchanged except it's captured in state) */}
              <div className="w-full gap-4 flex flex-col">
                <label className="text-sm text-grey-800">Product Features (optional)</label>
                {features.map((feature, index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="w-full border border-grey-100 text-base text-grey-300 py-2 px-3 rounded-full"
                      placeholder={`Product feature ${index + 1}`}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => removeFeature(index)} className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-400">
                        <CloseSquare size="20" />
                      </button>
                    )}
                  </div>
                ))}
                <div onClick={addFeature} className="flex gap-2 items-center text-primary-600 text-sm cursor-pointer">
                  <Add />
                  <p>Add feature</p>
                </div>
              </div>

              {/* Add Photo */}
              <div className="bg-grey-50 p-3 rounded-xl w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-base">Add Photo *</h1>
                  <p className="text-sm text-grey-500">Add at least 1 photo. You can add up to 5 photos.</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {uploadedImages.map((img) => (
                    <div key={img.id} className="relative w-24 h-24 rounded-2xl overflow-hidden">
                      <img src={img.url} alt="uploaded" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer" onClick={() => handleRemoveUploadedImage(img.id)}>
                        <Trash size="24" color="white" />
                      </div>
                    </div>
                  ))}
                  {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24 rounded-2xl overflow-hidden">
                      <img src={URL.createObjectURL(image)} alt="uploaded" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer" onClick={() => removeImage(index)}>
                        <Trash size="24" color="white" />
                      </div>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <div onClick={() => fileInputRef.current?.click()} className="bg-white cursor-pointer border border-grey-100 rounded-2xl w-24 h-24 flex justify-center items-center">
                      <Add color="#292D32" />
                      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-none text-sm text-grey-700">
                  Save to draft
                </button>
                <button type="submit" className="px-6 py-3 rounded-full bg-primary-500 text-white text-sm">
                  Submit for review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal (unchanged) */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsReviewModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-[400px]" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-medium text-center">Your product is reviewed</h2>
            <button
              onClick={() => {
                setIsReviewModalOpen(false);
                setIsModalOpen(true);
              }}
              className="px-6 py-3 rounded-full bg-primary-500 text-white text-sm mx-auto">
              Edit details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
