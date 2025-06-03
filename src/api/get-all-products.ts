"use server";
import { ProductsResponse } from "@/store";
import { cookies } from "next/headers";
import { api } from "@/lib/axios";

export interface GetAllProductsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
}

export async function getAllProducts({
  pageSize,
  page,
  filter,
}: GetAllProductsParams) {
  try {
    const token = cookies().get("auth_token")!.value;
    const response = await api.get<ProductsResponse>("products", {
      params: {
        filter,
        page,
        pageSize: pageSize || 10,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
