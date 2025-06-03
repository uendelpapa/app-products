"use server";
import { api } from "@/lib/axios";
import { cookies } from "next/headers";

interface UpdateProductData {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

interface UpdateProductResponse {
  title: string;
  description: string;
  status: boolean;
}
export async function updateProduct({
  id,
  title,
  description,
  status,
}: UpdateProductData) {
  try {
    const token = cookies().get("auth_token")!.value;

    const response = await api.put<UpdateProductResponse>(
      `products/${id}`,
      {
        title,
        description,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

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
