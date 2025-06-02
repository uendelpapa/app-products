import { addProduct } from "@/api/add-product";
import { getProducts } from "@/api/get-products";
import { removeProduct } from "@/api/remove-product";
import { updateProduct } from "@/api/update-product";
import { api } from "@/lib/axios";
import { get } from "http";
import { create } from "zustand";

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
  addProduct: (formData: FormData) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: {} as Products,
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getProducts();
      set({ products, loading: false });
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
  addProduct: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await addProduct(formData);
      const products = await getProducts();
      set({ products });
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
  removeProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await removeProduct({ id });
      set((state) => ({
        products: {
          ...state.products,
          data: state.products.data.filter((product) => product.id !== id),
        },
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
  updateProduct: async (id: string, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await updateProduct({ id, formData });
      const products = await getProducts();
      set({ products });
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
}));
