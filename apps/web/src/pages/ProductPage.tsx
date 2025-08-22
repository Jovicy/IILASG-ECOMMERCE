// src/pages/ProductPage.tsx
import { useParams } from "react-router-dom";
import { featuredProducts, recentProducts, bestSellers } from "@/data/database";

const allProducts = [...featuredProducts, ...recentProducts, ...bestSellers];

const ProductPage = () => {
    const { id } = useParams();
    const productId = id ? parseInt(id, 10) : null;
    const product = allProducts.find((p) => p.id === productId);


    if (!product) {
        return <h2 className="p-6 text-xl">Product not found</h2>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <img src={product.image} alt={product.name} className="h-64 object-contain mb-4" />
            <p className="text-lg font-semibold">₦{product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{product.rating} ★ ({product.reviews} reviews)</p>
        </div>
    );
};

export default ProductPage;
