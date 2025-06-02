"use server";

import { api } from "@/lib/axios";

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

export async function signIn({ email, password }: SignInData) {
  try {
    const response = await api.post<SignInResponse>("/auth/login", {
      email,
      password,
    });

    console.log("Response from API:", response.data);
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
