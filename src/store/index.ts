import { addProduct } from "@/api/add-product";
import { getAllProducts } from "@/api/get-all-products";
import { getProduct } from "@/api/get-product";

import { login } from "@/api/login";
import { registerUser } from "@/api/register-user";
import { removeProduct } from "@/api/remove-product";
import { updateProduct } from "@/api/update-product";
import { create } from "zustand";

interface Product {
  id: string;
  title: string;
  description: string;
  status: boolean;
  updatedAt: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  phone: {
    country: string;
    ddd: string;
    number: string;
  };
}

export interface Thumbnail {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  size: number;
  originalName: string;
  mimeType: string;
  key: string;
  idModule: string;
}

export interface ProductResponse {
  data: {
    thumbnail: Thumbnail;
    id: string;
    userId: string;
    title: string;
    description: string;
    status: boolean;
    idThumbnail: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ProductStore {
  products: ProductsResponse;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (data: RegisterData) => Promise<void>;
  getAllProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<ProductResponse | undefined>;
  addProduct: (formData: FormData) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, title: string, description: string, status: boolean) => Promise<void>;
  filterProducts: (filters: { id?: string; title?: string }) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: {} as ProductsResponse,
  loading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      await login({ email, password });
      // Handle successful login (e.g., save token)
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  registerUser: async (data: RegisterData) => {
    set({ loading: true, error: null });
    try {
      await registerUser(data);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
  getAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getAllProducts();
      set({ products, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  getProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getProduct({ id });
      set({ loading: false });
      return response;
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  addProduct: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await addProduct(formData);
      const products = await getAllProducts();
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
  updateProduct: async (id: string, title: string, description: string, status: boolean) => {
    set({ loading: true, error: null });
    try {
      await updateProduct({ id, title, description, status });
      const products = await getAllProducts();
      set({ products });
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw new Error(error.message);
    }
  },
  filterProducts: ({ id, title }) => {
    const allProducts = get().products.data;
    const filtered = allProducts.filter((product) => {
      const matchId = id ? product.id.includes(id) : true;
      const matchTitle = title ? product.title.toLowerCase().includes(title.toLowerCase()) : true;
      return matchId && matchTitle;
    });
    set((state) => ({
      products: {
        ...state.products,
        data: filtered,
      },
    }));
  },
}));
