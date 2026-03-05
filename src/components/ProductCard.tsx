import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className={cn("group relative block overflow-hidden rounded-xl bg-white", className)}
    >
      <div className="aspect-[4/5] sm:aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs font-medium text-gray-500">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-900 group-hover:underline decoration-1 underline-offset-4">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-gray-900">${product.price}</p>
      </div>
    </Link>
  );
}
