export interface TarifType {
  name: string;
  promo: boolean;
  speed: number;
  price: number;
  price2: number | null;
  description: string;
  tv: boolean;
  channels: number | null;
  dataPackage?: string;
  movie: string | null;
}

const tarifData: TarifType[] = [
  {
    name: "СТАРТ",
    promo: true,
    speed: 100,
    price: 549,
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
    speed: 300,
    price: 649,
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
    speed: 500,
    price: 699,
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
    price: 649,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: true,
    channels: 120,
    dataPackage: "5b504edcb2de77e82f591f1a",
    movie: null,
  },
  {
    name: "старт+кино",
    promo: true,
    speed: 100,
    price: 729,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: true,
    channels: 120,
    dataPackage: "5b504edcb2de77e82f591f1a",
    movie: "PREMIER",
  },
  {
    name: "хит+тв",
    promo: true,
    speed: 300,
    price: 799,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: true,
    channels: 250,
    dataPackage: "630f5b1c944a765510046e89",
    movie: "1 из 3 видеосервисов",
  },
  {
    name: "ультра+кино",
    promo: true,
    speed: 350,
    price: 899,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: true,
    channels: 300,
    dataPackage: "5e7b7e70acb10bd8ce882ef1",
    movie: "2 из 3 видеосервисов",
  },
  {
    name: "мега+кино",
    promo: true,
    speed: 500,
    price: 899,
    price2: null,
    description:
      "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
    tv: true,
    channels: 350,
    dataPackage: "5ec3b14fdf29dcff5d5ac065",
    movie: "3 из 3 видеосервисов",
  },
];

export default tarifData;
