import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Box1, RepeateOne, InfoCircle, Warning2, Eye, CloseSquare, TickCircle } from "iconsax-reactjs";
import { MoreVertical } from "lucide-react";
import { useGetMyProducts } from "@/hooks/product";
import { formatNaira, formatStatus } from "@/lib/utils";
import { ProductStatus } from "@/types";

// Reusable Card component
const DashboardCard = ({ title, value, subtitle, icon: Icon, iconColor, variant, className }: any) => (
  <div className={`bg-grey-50 border border-grey-50 shadow-sm rounded-lg p-4 flex flex-col justify-between ${className ?? ""}`}>
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-sm text-grey-600">{title}</h3>
      <div className={`bg-white h-12 w-12 p-2 rounded-full flex items-center justify-center ${iconColor}`}>
        <Icon size="24" variant={variant} />
      </div>
    </div>
    <div className="flex items-center justify-between gap-3">
      <p className="text-[32px] font-medium text-grey-950">{value}</p>
      {subtitle && <p className="text-sm text-grey-900 font-normal underline cursor-pointer">{subtitle}</p>}
    </div>
  </div>
);

const InventoryPage = () => {
  const navigate = useNavigate();

  const { data, isFetching } = useGetMyProducts();

  // ✅ Safely handle undefined data
  const products = data?.data ?? [];
  const totalProducts = data?.meta?.total ?? 0;

  const mockStats = [
    {
      title: "Total Products",
      value: totalProducts,
      subtitle: "View all products",
      icon: Box1,
      iconColor: "text-grey-900",
      variant: "Bold",
    },
    {
      title: "Low Stock Items",
      value: products.filter((p) => p.quantity > 0 && p.quantity <= 5).length.toString(),
      subtitle: "",
      icon: InfoCircle,
      iconColor: "text-primary-600",
      variant: "Bold",
    },
    {
      title: "Out of Stock",
      value: products.filter((p) => p.quantity === 0).length.toString(),
      subtitle: "",
      icon: Warning2,
      iconColor: "text-error-500",
      variant: "Bold",
    },
  ];

  // Inputs
  const [productName, setProductName] = useState("");
  const [newStock, setNewStock] = useState<number | "">("");

  // Tabs
  const tabs = ["All", "Low Stock", "Out of Stock"];
  const [activeTab, setActiveTab] = useState("All");

  // Modal state
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [restockProduct, setRestockProduct] = useState<any | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Prefill product name when modal opens
  useEffect(() => {
    if (restockProduct) {
      setProductName(restockProduct.name);
      setNewStock("");
    }
  }, [restockProduct]);

  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    if (activeTab === "All") return true;
    if (activeTab === "Low Stock") return product.quantity > 0 && product.quantity <= 5;
    if (activeTab === "Out of Stock") return product.quantity === 0;
    return true;
  });

  return (
    <div className="w-full">
      {/* Intro Section */}
      <section className="flex flex-col gap-1 mb-8">
        <h1 className="text-lg font-medium text-gray-950">Inventory Management</h1>
        <p className="text-sm text-gray-500 font-normal">Monitor and manage your product inventory</p>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} className="col-span-1 h-[175px]" />
        ))}
      </div>

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

      {/* Table */}
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
          <tbody className="divide-y bg-grey-50 text-grey-700">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t border-grey-200">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{formatNaira(product.price)}</td>

                {/* Stock column */}
                <td className="px-6 py-4 flex items-center gap-2">
                  {product.quantity > 0 ? (
                    <>
                      <span className="font-medium items-center">{product.quantity}</span>
                      {product.quantity <= 5 && <span className="text-yellow-600 bg-yellow-100 text-xs px-2 py-0.5 rounded">Low</span>}
                    </>
                  ) : (
                    <>
                      <span className="font-medium items-center">0</span>
                      <span className="text-red-600 bg-red-100 text-xs px-2 py-0.5 rounded">Out of stock</span>
                    </>
                  )}
                </td>

                {/* Status column */}
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-600">{formatStatus(product.status as ProductStatus)}</span>
                </td>

                {/* Dropdown menu */}
                <td className="px-6 py-4 relative text-end">
                  <button onClick={() => setOpenProductId(openProductId === product.id ? null : product.id)} className="p-2 rounded-full hover:bg-grey-100">
                    <MoreVertical size={20} />
                  </button>

                  {openProductId === product.id && (
                    <div className="absolute right-6 top-12 w-44 bg-white border border-grey-200 shadow-lg rounded-lg z-10">
                      <ul className="flex flex-col text-sm text-grey-500">
                        <li
                          className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                          onClick={() => {
                            setOpenProductId(null);
                            setRestockProduct(product);
                          }}>
                          <RepeateOne size="16" /> Restock
                        </li>
                        <li
                          className="flex items-center gap-2 px-4 py-2 cursor-pointer"
                          onClick={() => {
                            setOpenProductId(null);
                            navigate(`/vendor/products/${product.id}`);
                          }}>
                          <Eye size="16" /> View Product
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Restock Modal */}
      {restockProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-[764px]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Restock Product</h2>
              <button onClick={() => setRestockProduct(null)} className="text-[#4E4E4E]">
                <CloseSquare />
              </button>
            </div>

            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();

                if (!productName || !newStock) {
                  alert("Please fill out all fields before updating.");
                  return;
                }

                console.log("✅ Restock form submitted:", { productName, newStock });

                setRestockProduct(null);
                setShowSuccess(true);
              }}>
              {/* Product Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-800">Product Name *</label>
                <input
                  type="text"
                  value={productName}
                  readOnly
                  className="w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2 bg-gray-100 cursor-not-allowed"
                  placeholder="[Product Name]"
                />
              </div>

              {/* Stock Quantity */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-800">Stock Quantity *</label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  className="w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2"
                  placeholder="0"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="submit" className="px-6 py-3 rounded-full bg-primary-500 text-white text-base">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-6 w-[481px] text-center">
            <div className="bg-success-100 rounded-full w-12 h-12 flex items-center justify-center">
              <TickCircle size="20" color="#00BD59" variant="Bold" />
            </div>
            <h2 className="text-lg font-medium text-[#202020]">Updates Saved Successfully</h2>
            <button className="text-sm bg-transparent text-grey-500" onClick={() => setShowSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
