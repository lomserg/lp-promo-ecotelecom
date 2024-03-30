export interface TarifType {
  name: string;
  promo: boolean;
  speed: number;
  price: number;
  price2: number | null;
  description: string;
  tv: boolean;
  channels: number | null;
  movie: number | null;
}

const tarifData: TarifType[] = [
  {
    name: "СТАРТ",
    promo: true,
    speed: 100,
    price: 100,
    price2: 1000,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: false,
    channels: null,
    movie: null,
  },
  {
    name: "ХИТ",
    promo: true,
    speed: 100,
    price: 100,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: false,
    channels: null,
    movie: null,
  },
  {
    name: "МЕГА",
    promo: true,
    speed: 100,
    price: 100,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: false,
    channels: null,
    movie: null,
  },
  {
    name: "старт+тв",
    promo: true,
    speed: 100,
    price: 100,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: true,
    channels: 120,
    movie: null,
  },
  {
    name: "старт+кино",
    promo: true,
    speed: 100,
    price: 100,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: true,
    channels: 120,
    movie: null,
  },
];

export default tarifData;
