"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { signIn } from "@/api/sign-in";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "zod/v4";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const successToast = () => {
    addToast({
      title: "Login bem-sucedido",
      description: "Você foi autenticado com sucesso!",
      color: "success",
    });
  };

  const errorToast = (message: string) => {
    return addToast({
      title: "Erro ao fazer login",
      description: message,
      color: "danger",
    });
  };

  const onSubmit = async (data: SignInData) => {
    try {
      setIsLoading(true);
      await signIn(data);
      successToast();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao fazer login:", error);
      errorToast(error instanceof Error ? error.message : "Erro desconhecido");
      return;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input label="E-mail" type="email" {...register("email")} />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <Input label="Senha" type="password" {...register("password")} />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
          disabled={isLoading}
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
