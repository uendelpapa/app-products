interface Product {
  id: string;
  title: string;
  description: string;
  status: boolean;
  updatedAt: string;
}

interface Products {
  data: Product[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const products: Products = {
  data: [
    {
      id: "1",
      title: "Café Expresso",
      description:
        "Café expresso é um café forte e concentrado, feito com água quente passando rapidamente por grãos de café finamente moídos.",
      status: true,
      updatedAt: "2023-01-01",
    },
    {
      id: "2",
      title: "Café Americano",
      description:
        "Café americano é um café diluído, feito adicionando água quente ao café expresso, resultando em uma bebida mais suave.",
      status: true,
      updatedAt: "2023-01-02",
    },
    {
      id: "3",
      title: "Cappuccino",
      description:
        "Cappuccino é uma bebida de café feita com partes iguais de café expresso, leite vaporizado e espuma de leite.",
      status: true,
      updatedAt: "2023-01-03",
    },
    {
      id: "4",
      title: "Cafe Mocha",
      description:
        "Cafe Mocha é uma bebida de Café feita com partes iguais de Café Expresso, chocolate ao leite e espuma de leite.",
      status: true,
      updatedAt: "2023-01-04",
    },
    {
      id: "5",
      title: "Café Latte",
      description:
        "Café Latte é uma bebida de café feita com partes iguais de café expresso e leite vaporizado, coberta com espuma de leite.",
      status: true,
      updatedAt: "2023-01-05",
    },
    {
      id: "6",
      title: "Café Gelado",
      description:
        "Café gelado é uma bebida refrescante feita com café expresso resfriado, gelo e leite ou creme.",
      status: true,
      updatedAt: "2023-01-06",
    },
    {
      id: "7",
      title: "Café com Leite",
      description:
        "Café com leite é uma bebida de café feita com partes iguais de café e leite quente.",
      status: true,
      updatedAt: "2023-01-07",
    },
    {
      id: "8",
      title: "Café Descafeinado",
      description:
        "Café descafeinado é um café que passou por um processo para remover a cafeína, mantendo o sabor do café.",
      status: true,
      updatedAt: "2023-01-08",
    },
    {
      id: "9",
      title: "Café Turco",
      description:
        "Café turco é uma bebida tradicional feita com café moído finamente, água e açúcar, cozida em um recipiente especial chamado cezve.",
      status: true,
      updatedAt: "2023-01-09",
    },
    {
      id: "10",
      title: "Café Irlandês",
      description:
        "Café irlandês é uma bebida quente feita com café, uísque irlandês, açúcar e creme de leite.",
      status: true,
      updatedAt: "2023-01-10",
    },
  ],
  meta: {
    page: 1,
    pageSize: 10,
    total: 10,
    totalPages: 1,
  },
};
