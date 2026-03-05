import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, products as fallbackProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Transform data if necessary to match Product interface
          // Assuming the Supabase table matches the Product interface closely
          // We might need to handle arrays stored as JSON or text[]
          const transformedData = data.map((item: any) => ({
            ...item,
            // Ensure arrays are arrays (Supabase might return them as is, but good to be safe)
            sizes: Array.isArray(item.sizes) ? item.sizes : [],
            colors: Array.isArray(item.colors) ? item.colors : [],
          }));
          setProducts(transformedData);
        } else {
          // Fallback to mock data if table is empty or doesn't exist yet
          // This is helpful for the user to see something immediately
          console.log('No products found in Supabase, using fallback data.');
          setProducts(fallbackProducts);
        }
      } catch (err: any) {
        console.error('Error fetching products:', err.message);
        setError(err.message);
        // Fallback on error (e.g. table doesn't exist)
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
           const transformedData = {
            ...data,
            sizes: Array.isArray(data.sizes) ? data.sizes : [],
            colors: Array.isArray(data.colors) ? data.colors : [],
          };
          setProduct(transformedData);
        } else {
           // Fallback
           const fallback = fallbackProducts.find(p => p.id === id);
           setProduct(fallback);
        }
      } catch (err: any) {
        console.error('Error fetching product:', err.message);
        setError(err.message);
        // Fallback
        const fallback = fallbackProducts.find(p => p.id === id);
        setProduct(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
