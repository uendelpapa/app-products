"use client";

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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IconFilter, IconTrash } from "@tabler/icons-react";
import { IconCoffee, IconId, IconInfoCircle } from "@tabler/icons-react";
import { UpdateProductModal } from "@/components/update-product-modal";
import { AddProductModal } from "@/components/add-product-modal";

const columns = [
  {
    key: "id",
    label: (
      <span className="flex items-center gap-1">
        <IconId className="size-4" />
        ID
      </span>
    ),
  },
  {
    key: "title",
    label: (
      <span className="flex items-center gap-1">
        <IconCoffee className="size-4" />
        Café
      </span>
    ),
  },
  {
    key: "description",
    label: (
      <span className="flex items-center gap-1">
        <IconInfoCircle className="size-4" />
        Descrição
      </span>
    ),
  },
  { key: "", label: "" },
];

const filterProductsSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
});

type FilterProductsType = z.infer<typeof filterProductsSchema>;

export default function Home() {
  const { products, loading, getAllProducts, removeProduct } =
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

  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllProducts({ page });
  }, [page]);

  function onSubmit(data: FilterProductsType) {
    getAllProducts({
      page: 1,
      filter: data.title,
    }).then((response) => {
      setPage(1);
    });
  }

  function onClearFilter() {
    reset();
    getAllProducts({ page: 1 });
  }

  if (!products) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full justify-between items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-2xl w-full justify-between items-center gap-4"
        >
          <Input
            label="Buscar café"
            size="sm"
            type="text"
            {...register("title")}
          />
          <Button
            className="flex w-32 font-semibold items-center"
            variant="solid"
            color="primary"
            disabled={!watch("title")}
            type="submit"
          >
            <IconFilter className="size-4" />
            Filtrar
          </Button>
          <Button className="flex w-48" onPress={onClearFilter}>
            <IconTrash className="size-4" />
            Limpar filtro
          </Button>
        </form>
        <div className="flex gap-4">
          <AddProductModal />
        </div>
      </div>

      <Table aria-label="Tabela de produtos">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={products.data ?? []}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "" ? (
                    <div className="flex justify-end gap-4">
                      <UpdateProductModal id={item.id} />
                      <Button
                        color="danger"
                        variant="bordered"
                        onPress={() => removeProduct(item.id)}
                      >
                        <IconTrash className="size-4" />
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
        <span>Total de produtos: {products.meta?.total}</span>

        <Pagination
          disableCursorAnimation
          showControls
          className="gap-2"
          initialPage={1}
          radius="full"
          total={products.meta?.totalPages}
          variant="light"
          page={products.meta?.page}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
