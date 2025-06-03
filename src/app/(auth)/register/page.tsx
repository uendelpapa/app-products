"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { useState } from "react";
import { useProductStore } from "@/store";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Nome obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    verifyPassword: z.string().min(6, "Confirme a senha"),
    phone: z.object({
      country: z.string().min(1, "País obrigatório"),
      ddd: z.string().min(2, "DDD obrigatório"),
      number: z.string().min(8, "Número obrigatório"),
    }),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "As senhas não coincidem",
    path: ["verifyPassword"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const { registerUser } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
      phone: {
        country: "",
        ddd: "",
        number: "",
      },
    },
  });

  const successToast = () => {
    addToast({
      title: "Cadastro bem-sucedido",
      description: "Você foi cadastrado com sucesso!",
      color: "success",
    });
  };

  const errorToast = (message: string) => {
    addToast({
      title: "Erro ao cadastrar usuário",
      description: message,
      color: "danger",
    });
  };

  const onSubmit = async (data: SignUpData) => {
    try {
      setIsLoading(true);
      await registerUser(data);

      successToast();
      router.push("/sign-in");
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao cadastrar usuário:", error);
      errorToast(error instanceof Error ? error.message : "Erro desconhecido");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:from-default-900 dark:to-default-950">
      <div className="w-full bg-default-900 max-w-md dark:bg-default-900 rounded-2xl shadow-2xl p-8 border border-default-200 dark:border-default-800">
        <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight">
          Criar Conta
        </h2>
        <p className="mb-8 text-center text-default-500 dark:text-default-400">
          Preencha os campos para se cadastrar
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            id="name"
            label="Nome"
            type="text"
            {...register("name")}
            autoComplete="name"
            className="w-full"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}

          <Input
            id="email"
            type="email"
            label="E-mail"
            {...register("email")}
            autoComplete="email"
            className="w-full"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <div className="flex gap-2">
            <div className="w-1/3">
              <Input
                id="country"
                type="text"
                label="+00"
                {...register("phone.country")}
              />
              {errors.phone?.country && (
                <span className="text-red-500 text-xs flex-1">
                  {errors.phone.country.message}
                </span>
              )}
            </div>
            <div className="w-1/3">
              <Input
                id="ddd"
                type="text"
                label="DDD"
                {...register("phone.ddd")}
              />
              {errors.phone?.ddd && (
                <span className="text-red-500 text-xs flex-1">
                  {errors.phone.ddd.message}
                </span>
              )}
            </div>
            <div className="w-1/3">
              <Input
                id="number"
                type="text"
                label="Telefone"
                {...register("phone.number")}
              />
              {errors.phone?.number && (
                <span className="text-red-500 text-xs flex-1">
                  {errors.phone.number.message}
                </span>
              )}
            </div>
          </div>

          <Input
            id="password"
            type="password"
            label="Senha"
            {...register("password")}
            autoComplete="new-password"
            className="w-full"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}

          <Input
            id="verifyPassword"
            type="password"
            label="Confirme a Senha"
            {...register("verifyPassword")}
            autoComplete="new-password"
            className="w-full"
          />
          {errors.verifyPassword && (
            <span className="text-red-500 text-xs">
              {errors.verifyPassword.message}
            </span>
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full mt-4 font-semibold rounded-lg py-3 transition"
            disabled={isLoading}
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
        <div className="mt-8 text-center text-sm text-default-500 dark:text-default-400">
          Já possui uma conta?{" "}
          <a
            href="/sign-in"
            className=" font-semibold"
          >
            Entrar
          </a>
        </div>
      </div>
    </div>
  );
}
