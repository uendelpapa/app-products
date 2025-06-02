"use server"
import { api } from "@/lib/axios";

interface UpdateProductData {
  id: string;
  formData: FormData;
}

interface UpdateProductResponse {
  title: string;
  description: string;
  status: boolean;
}
export async function updateProduct({ id, formData }: UpdateProductData) {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmM5MGE5NC0yZjFmLTRmYTktOGY5Zi1mMjYwOWNkNTM5ZWYiLCJlbWFpbCI6ImRpdmluZS5rbmlnaHRzREtUVEBnbWFpbC5jb20iLCJwbGF0Zm9ybVJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ4ODA3OTQ0LCJleHAiOjE3NDg4OTQzNDR9.IyzISLlFMZmMCY8lIptpmx-MeFt7hSC8IOvuFui-YQY";

    const response = await api.put<UpdateProductResponse>(
      `products/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Produto atualizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro desconhecido ao atualizar produto");
    }
  }
}
