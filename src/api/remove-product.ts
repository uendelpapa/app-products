import { api } from "@/lib/axios";

interface removeProductData {
  id: string;
}

interface RemoveProductResponse {
  codeIntern: string;
  message: string;
}
export async function removeProduct({ id }: removeProductData) {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmM5MGE5NC0yZjFmLTRmYTktOGY5Zi1mMjYwOWNkNTM5ZWYiLCJlbWFpbCI6ImRpdmluZS5rbmlnaHRzREtUVEBnbWFpbC5jb20iLCJwbGF0Zm9ybVJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ4ODA3OTQ0LCJleHAiOjE3NDg4OTQzNDR9.IyzISLlFMZmMCY8lIptpmx-MeFt7hSC8IOvuFui-YQY";

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
