"use server";
import { api } from "@/lib/axios";

interface addProductData {
  title: string;
  description: string;
  ImageUrl?: string;
  imageBinary?: string;
}

interface addProductResponse {
  codeIntern: string;
  message: string;
  id: string;
}

export async function addProduct({
  title,
  description,
  ImageUrl,
  imageBinary,
}: addProductData) {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmM5MGE5NC0yZjFmLTRmYTktOGY5Zi1mMjYwOWNkNTM5ZWYiLCJlbWFpbCI6ImRpdmluZS5rbmlnaHRzREtUVEBnbWFpbC5jb20iLCJwbGF0Zm9ybVJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ4ODA3OTQ0LCJleHAiOjE3NDg4OTQzNDR9.IyzISLlFMZmMCY8lIptpmx-MeFt7hSC8IOvuFui-YQY"; // Ou obtenha de outro lugar seguro
    const response = await api.post<addProductResponse>(
      "products",
      {
        title,
        description,
        thumbnail: imageBinary || ImageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro desconhecido ao adicionar produto");
    }
  }
}
