"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { registerUser } from "@/api/register-user";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import { useState } from "react";

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
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Criar Conta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input id="name" label="Nome" type="text" {...register("name")} />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div>
          <Input
            id="email"
            type="email"
            label="E-mail"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="Senha"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <Input
            id="verifyPassword"
            type="password"
            label="Confirme a Senha"
            {...register("verifyPassword")}
          />
          {errors.verifyPassword && (
            <span className="text-red-500 text-sm">
              {errors.verifyPassword.message}
            </span>
          )}
        </div>
        <div>
          <Input
            id="country"
            type="text"
            label="+00"
            {...register("phone.country")}
          />
          {errors.phone?.country && (
            <span className="text-red-500 text-sm">
              {errors.phone.country.message}
            </span>
          )}
        </div>
        <div>
          <Input id="ddd" type="text" label="DDD" {...register("phone.ddd")} />
          {errors.phone?.ddd && (
            <span className="text-red-500 text-sm">
              {errors.phone.ddd.message}
            </span>
          )}
        </div>
        <div>
          <Input
            id="number"
            type="text"
            label="Telefone"
            {...register("phone.number")}
            className="w-full p-2 border rounded"
            required
          />
          {errors.phone?.number && (
            <span className="text-red-500 text-sm">
              {errors.phone.number.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
          disabled={isLoading}
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}