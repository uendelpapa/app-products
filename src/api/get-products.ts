"use server"

import { Products } from "@/store";
import axios from "axios";

export async function getProducts() {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmM5MGE5NC0yZjFmLTRmYTktOGY5Zi1mMjYwOWNkNTM5ZWYiLCJlbWFpbCI6ImRpdmluZS5rbmlnaHRzREtUVEBnbWFpbC5jb20iLCJwbGF0Zm9ybVJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ4ODA3OTQ0LCJleHAiOjE3NDg4OTQzNDR9.IyzISLlFMZmMCY8lIptpmx-MeFt7hSC8IOvuFui-YQY";
    const response = await axios.get<Products>(
      "https://api-teste-front-production.up.railway.app/products",{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      }
    );

    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
