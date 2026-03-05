import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Filter, X } from 'lucide-react';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { products, loading } = useProducts();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam || 'All');
  const [selectedBrand, setSelectedBrand] = useState<string | null>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const categories = ['All', 'Running', 'Lifestyle', 'Basketball', 'Training'];
  const brands = ['All', 'Nike', 'Adidas', 'Asics', 'Jordan', 'Converse'];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || !selectedCategory ? true : product.category === selectedCategory;
      const brandMatch = selectedBrand === 'All' ? true : product.brand === selectedBrand;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && brandMatch && priceMatch;
    });
  }, [selectedCategory, selectedBrand, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
        
        <div className="flex items-center">
          <button 
            type="button" 
            className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="sr-only">Filters</span>
            <Filter className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters Sidebar (Desktop) */}
          <form className="hidden lg:block space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category || (category === 'All' && !selectedCategory)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      id={`brand-${brand}`}
                      name="brand"
                      type="radio"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-600">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Price Range</h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
          </form>

          {/* Mobile Filters Dialog */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-40 flex lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsFilterOpen(false)} />
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Filter Forms */}
                <form className="mt-4 border-t border-gray-200 px-4 py-4 space-y-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`mobile-category-${category}`}
                            name="category"
                            type="radio"
                            checked={selectedCategory === category || (category === 'All' && !selectedCategory)}
                            onChange={() => handleCategoryChange(category)}
                            className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                          />
                          <label htmlFor={`mobile-category-${category}`} className="ml-3 text-sm text-gray-600">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Brand</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <input
                            id={`mobile-brand-${brand}`}
                            name="brand"
                            type="radio"
                            checked={selectedBrand === brand}
                            onChange={() => setSelectedBrand(brand)}
                            className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                          />
                          <label htmlFor={`mobile-brand-${brand}`} className="ml-3 text-sm text-gray-600">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] w-full rounded-xl bg-gray-200" />
                    <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium text-gray-900">No products found</p>
                <p className="text-gray-500">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
