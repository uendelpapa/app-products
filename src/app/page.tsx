"use client";
import { AddProductButton } from "@/components/add-product-button";
import { useProductStore } from "@/store";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button,
  Pagination,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateProductButton } from "../components/update-product-button";

const columns = [
  {
    key: "thumbnail",
    label: "",
  },
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Coffee",
  },
  {
    key: "description",
    label: "Descrição",
  },
  {
    key: "",
    label: "",
  },
];

const filterProductsSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
});

type FilterProductsType = z.infer<typeof filterProductsSchema>;

export default function Home() {
  const { products, loading, getAllProducts, removeProduct, filterProducts } =
    useProductStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FilterProductsType>({
    resolver: zodResolver(filterProductsSchema),
    defaultValues: {
      id: "",
      title: "",
    },
  });

  function onSubmit(data: FilterProductsType) {
    console.log("Form submitted with data:", data);
    filterProducts(data);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      <div className="flex justify-between items-center gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between items-center gap-4"
        >
          <div className="flex gap-4 items-center">
            <Input
              className=""
              label="ID"
              size="sm"
              type="text"
              {...register("id")}
            />
            <Input
              className=""
              label="Titulo"
              size="sm"
              type="text"
              {...register("title")}
            />
            <Button
              variant="shadow"
              disabled={!watch("id") && !watch("title")}
              type="submit"
            >
              Filtrar
            </Button>
          </div>
        </form>
        <div className="flex gap-4">
          <Button className="">Limpar filtro</Button>
          <AddProductButton />
        </div>
      </div>

      <Table aria-label="Tabela de produtos">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={products?.data ?? []}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "" ? (
                    <div className="flex justify-end gap-4">
                      <UpdateProductButton id={item.id} />
                      <Button onPress={() => removeProduct(item.id)}>
                        Excluir
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center gap-4">
        <span>Total de produtos: 10</span>

        <Pagination
          disableCursorAnimation
          showControls
          className="gap-2"
          initialPage={1}
          radius="full"
          total={10}
          variant="light"
        />
      </div>
    </div>
  );
}
