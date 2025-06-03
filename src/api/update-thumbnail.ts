"use server";
import { api } from "@/lib/axios";
import { cookies } from "next/headers";

interface UpdateThumbnailData {
  id: string;
  formData: FormData;
}

export async function updateThumbnail({ id, formData }: UpdateThumbnailData) {
  try {
    const token = cookies().get("auth_token")!.value;
    const response = await api.patch(`products/thumbnail/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar thumbnail:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Erro desconhecido ao atualizar thumbnail");
    }
  }
}
