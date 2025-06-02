"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  addToast,
  Image,
} from "@heroui/react";
import { IconMail, IconMessage } from "@tabler/icons-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductStore } from "@/store";
import { useEffect, useState } from "react";

const addProductSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.boolean(),
});

type AddProductData = z.infer<typeof addProductSchema>;

interface UpdateProductButtonProps {
  id: string;
}

export interface Thumbnail {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  size: number;
  originalName: string;
  mimeType: string;
  key: string;
  idModule: string;
}

export interface ProductResponse {
  data: {
    thumbnail: Thumbnail;
    id: string;
    userId: string;
    title: string;
    description: string;
    status: boolean;
    idThumbnail: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function UpdateProductButton({ id }: UpdateProductButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getProduct, updateProduct } = useProductStore();
  const [product, setProduct] = useState<ProductResponse | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddProductData>({
    resolver: zodResolver(addProductSchema),
    
  });

  // Carrega o produto localmente ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      (async () => {
        const res = await getProduct(id);
        if (res) {
          setProduct(res);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Atualiza os campos do formulário quando o produto for carregado
  useEffect(() => {
    if (product?.data && isOpen) {
      setValue("title", product.data.title || "");
      setValue("description", product.data.description || "");
      setValue("status", product.data.status ?? true);
    }
  }, [product, isOpen, setValue]);

  const successToast = () => {
    addToast({
      title: "Produto atualizado com sucesso!",
      color: "success",
    });
  };

  const errorToast = (message: string) => {
    return addToast({
      title: "Opa, algo deu errado",
      description: message,
      color: "danger",
    });
  };

  const onSubmit = async (data: AddProductData) => {
    try {
      await updateProduct(id, data.title, data.description, data.status);
      successToast();
      onOpenChange();
      reset();
    } catch (error) {
      errorToast(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar produto"
      );
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Editar produto
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                id="update-product-form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <ModalHeader className="flex flex-col gap-1">
                  Editar Produto
                </ModalHeader>
                <ModalBody>
                  <Image src={product?.data.thumbnail.url}/>
                  <Input
                    endContent={
                      <IconMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Título"
                    placeholder="Digite o título do produto"
                    type="text"
                    variant="flat"
                    {...register("title")}
                  />
                  <Textarea
                    endContent={
                      <IconMessage className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Descrição"
                    placeholder="Digite a descrição do produto"
                    type="text"
                    variant="flat"
                    {...register("description")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" type="submit">
                    Salvar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
