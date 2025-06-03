"use server"
import { api } from "@/lib/axios";
import { cookies } from "next/headers";

interface removeProductData {
  id: string;
}

interface RemoveProductResponse {
  codeIntern: string;
  message: string;
}
export async function removeProduct({ id }: removeProductData) {
  try {
    const token = cookies().get('auth_token')!.value;
    const response = await api.delete<RemoveProductResponse>(`products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao remover produto:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro desconhecido ao remover produto");
    }
  }

  return;
}
