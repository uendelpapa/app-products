"use server";

import { api } from "@/lib/axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  phone: {
    country: string;
    ddd: string;
    number: string;
  };
}

interface RegisterResponse {
  codeIntern: string;
  message: string;
  token: string;
}

export async function registerUser({
  name,
  email,
  password,
  verifyPassword,
  phone,
}: RegisterData) {
  try {
    const response = await api.post<RegisterResponse>("users", {
      name,
      email,
      password,
      verifyPassword,
      phone: {
        country: phone.country,
        ddd: phone.ddd,
        number: phone.number,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw new Error(
      error instanceof Error ? error.message : "Erro desconhecido ao registrar"
    );
  }
}
