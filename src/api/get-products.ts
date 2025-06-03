"use server";
import { ProductsResponse } from "@/store";
import axios from "axios";
import { cookies } from "next/headers";

export async function getProducts() {
  try {
    const token = cookies().get("auth_token")!.value;
    const response = await axios.get<ProductsResponse>(
      "https://api-teste-front-production.up.railway.app/products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
