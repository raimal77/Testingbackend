import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useProduct(id);
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 animate-pulse">
          <div className="aspect-[4/5] w-full rounded-2xl bg-gray-200 lg:aspect-square" />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="mt-4 h-8 w-1/4 rounded bg-gray-200" />
            <div className="mt-6 h-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="mt-4 text-black hover:underline"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-black"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Product Image */}
        <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 lg:aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
          </div>

          {/* Reviews */}
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className="h-5 w-5 flex-shrink-0 text-yellow-400 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="sr-only">5 out of 5 stars</p>
            <span className="ml-3 text-sm font-medium text-black hover:text-gray-500">
              117 reviews
            </span>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="space-y-6 text-base text-gray-700">{product.description}</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <a href="#" className="text-sm font-medium text-black hover:underline">
                Size guide
              </a>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`group relative flex items-center justify-center rounded-md border py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 ${
                    selectedSize === size
                      ? 'border-transparent bg-black text-white hover:bg-gray-800'
                      : 'border-gray-200 bg-white text-gray-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedSize}
            onClick={handleAddToCart}
            className={`mt-8 flex w-full items-center justify-center rounded-full border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              selectedSize
                ? 'bg-black hover:bg-gray-800'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {selectedSize ? 'Add to Cart' : 'Select a Size'}
          </button>

          <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-500">Free shipping on orders over $200</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-500">2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
