import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961d28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Hero"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Step Into Greatness.
          </h1>
          <p className="mt-4 max-w-xl text-xl text-gray-200">
            Discover the latest collection of premium athletic footwear designed for performance and style.
          </p>
          <div className="mt-8">
            <Link
              to="/shop"
              className="inline-block rounded-full bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-100 transition-colors"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Drops</h2>
          <Link to="/shop" className="text-sm font-medium text-black hover:underline underline-offset-4">
            View All
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] w-full rounded-xl bg-gray-200" />
                <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Category Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link to="/shop?category=Running" className="group relative h-64 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Running"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white">Running</h3>
            </div>
          </Link>
          <Link to="/shop?category=Lifestyle" className="group relative h-64 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Lifestyle"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white">Lifestyle</h3>
            </div>
          </Link>
          <Link to="/shop?category=Basketball" className="group relative h-64 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1519861531473-920026393112?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Basketball"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold text-white">Basketball</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
