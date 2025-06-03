"use server";
import { cookies } from "next/headers";
import { api } from "@/lib/axios";

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

interface ProductProps {
  id: string;
}

export async function getProduct({ id }: ProductProps) {
  try {
    const token = cookies().get('auth_token')!.value;
    const response = await api.get<ProductResponse>(`products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log("Product fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}
