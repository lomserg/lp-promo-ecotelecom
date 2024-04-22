import ElementCreator from "../utils/create-element";
//const elementCreator = new ElementCreator()
export type Props = {
  tag: string;
  classNames: string | string[];
  callback?: Function;
};

export type TarifObj = {
  name: string;
  promo: boolean;
  speed: number;
  price: number;
  price2: number | null;
  description: string;
  tv: boolean;
  channels: string | null;
  dataPackage: string | null;
  movie: string | null;
};

export default class Card {
  data: TarifObj[];
  props: Props;
  constructor(data: TarifObj[], props: Props) {
    (this.data = data), (this.props = props);
  }

  createCard() {}
}
