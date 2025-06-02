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
  Switch,
  addToast,
} from "@heroui/react";
import { IconMail, IconMessage, IconPhoto } from "@tabler/icons-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductStore } from "@/store";

const addProductSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
});

type AddProductData = z.infer<typeof addProductSchema>;

interface UpdateProductButtonProps {
  id: string;
}

export function UpdateProductButton({ id }: UpdateProductButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { updateProduct } = useProductStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddProductData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      description: "",
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
      title: "Opa, algo deu errado",
      description: message,
      color: "danger",
    });
  };

  const onSubmit = async (data: AddProductData) => {
    try {
      console.log("Form data submitted:", data);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      // console.log("FormData:", formData);
      await updateProduct(id, formData);
      successToast();
      onOpenChange();
    } catch (error) {
      errorToast(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao adicionar produto"
      );
      console.error("Erro ao adicionar produto:", error);
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
                  Cadastrar Produto
                </ModalHeader>
                <ModalBody>
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

                  {/* <div className="flex flex-col gap-2">
                    <Switch
                      isSelected={isSelected}
                      onValueChange={setIsSelected}
                    >
                      <span className="text-sm">Usar URL da Imagem</span>
                    </Switch>
                  </div> */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" type="submit">
                    Adicionar
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
