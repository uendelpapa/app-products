import { api } from '@/lib/axios';
import { create } from 'zustand';

interface Product {
  id: string;
  title: string;
  description: string;
  status: boolean;
  updatedAt: string;
}

export interface Products {
  data: Product[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

interface ProductStore {
  products: Products;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<Product | null>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: {} as Products,
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('products');
      set({ products: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  getProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`products/${id}`);
      set({ loading: false });
      return response.data as Product;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return null;
    }
  },
}));