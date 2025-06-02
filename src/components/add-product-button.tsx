import React, { useState } from "react";
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
import { addProduct } from "@/api/add-product";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addProductSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  imageUrl: z.string().optional(),
  imageFile: z
    .any()
    .refine(
      (file) => file instanceof File || file === undefined,
      "Imagem é obrigatória"
    )
    .optional(),
});

type AddProductData = z.infer<typeof addProductSchema>;

export function AddProductButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);

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
      imageUrl: "",
      imageFile: undefined,
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

  // Função utilitária para converter File em base64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove o prefixo "data:*/*;base64,"
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const onSubmit = async (data: AddProductData) => {
    try {
      if (!isSelected && !file) {
        errorToast("Selecione uma imagem.");
        return;
      }

      let imageBinary: string | undefined = undefined;

      if (!isSelected && file) {
        imageBinary = await fileToBase64(file); // Converte para base64
      }

      // Exemplo de envio dos dados
      const payload = {
        title: data.title,
        description: data.description,
        imageUrl: isSelected ? data.imageUrl : undefined,
        imageBinary: !isSelected ? imageBinary : undefined, // string($binary)
      };

      console.log("Payload enviado:", payload);

      await addProduct(payload);
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
        Adicionar produto
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                id="add-product-form"
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
                  {isSelected ? (
                    <Input
                      endContent={
                        <IconPhoto className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="URL da Imagem"
                      placeholder="Digite a URL da imagem do produto"
                      type="text"
                      variant="flat"
                      required
                      {...register("imageUrl", {
                        required: true,
                      })}
                    />
                  ) : (
                    <Input
                      endContent={
                        <IconPhoto className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Imagem"
                      placeholder="Selecione a imagem do produto"
                      type="file"
                      accept="image/*"
                      variant="flat"
                      onChange={(e) => {
                        const files = e.target.files;
                        setFile(
                          files && files.length > 0 ? files[0] : undefined
                        );
                        setValue(
                          "imageFile",
                          files && files.length > 0 ? files[0] : undefined
                        );
                      }}
                    />
                  )}

                  <div className="flex flex-col gap-2">
                    <Switch
                      isSelected={isSelected}
                      onValueChange={setIsSelected}
                    >
                      <span className="text-sm">Usar URL da Imagem</span>
                    </Switch>
                  </div>
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
