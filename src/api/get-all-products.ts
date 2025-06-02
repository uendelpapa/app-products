"use server"
import { ProductsResponse } from "@/store";
import { cookies } from "next/headers";
import { api } from "@/lib/axios";

export async function getAllProducts() {
  try {
    const token = cookies().get('auth_token')!.value;
    const response = await api.get<ProductsResponse>("products", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
