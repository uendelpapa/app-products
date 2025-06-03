"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProductStore } from "@/store";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { login } = useProductStore();
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
    },
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
      await login(data.email, data.password);
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
    <div className="min-h-screen flex items-center justify-center  dark:from-default-900 dark:to-default-950">
      <div className="w-full max-w-md bg-white dark:bg-default-900 rounded-2xl shadow-xl p-8 border border-default-200 dark:border-default-800">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-700 dark:text-blue-300">
          Entrar
        </h2>
        <p className="mb-6 text-center text-default-500 dark:text-default-400">
          Acesse sua conta para continuar
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="E-mail"
            type="email"
            {...register("email")}
            className="w-full"
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <Input
            label="Senha"
            type="password"
            {...register("password")}
            className="w-full"
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}

          <Button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-default-500 dark:text-default-400">
          Não possui uma conta?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline dark:text-blue-400 font-semibold"
          >
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}
