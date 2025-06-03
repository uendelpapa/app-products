"use server";
import { api } from "@/lib/axios";
import { cookies } from "next/headers";

export type AddProductResponse = {
  codeIntern: string;
  message: string;
  id: string;
};

export async function addProduct(formData: FormData) {
  try {
    const token = cookies().get("auth_token")!.value;
    const response = await api.post<AddProductResponse>("products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
