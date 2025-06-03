"use server";
import { api } from "@/lib/axios";
import { cookies } from "next/headers";

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  user: {
    phone: {
      country: string;
      ddd: string;
      number: string;
    };
    avatar: Array<{
      id: string;
      url: string;
    }>;
    number: string;
    email: string;
    platformRole: string;
    status: string;
    name: string;
    id: string;
    emailStatus: string;
    createdAt: string;
    updatedAt: string;
    street: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    renewalsNumber: number;
  };
}

export async function login({ email, password }: SignInData) {
  try {
    const response = await api.post<SignInResponse>("/auth/login", {
      email,
      password,
    });

    // Salva o token nos cookies
    cookies().set("auth_token", response.data.token, {
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });
    cookies().set("session_username", response.data.user.name, {
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });
    cookies().set("session_email", response.data.user.email, {
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error during sign-in:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "An unknown error occurred during sign-in."
    );
  }
}
