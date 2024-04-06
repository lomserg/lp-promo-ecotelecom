import { FormItem } from "./inputs/inputs";
import "./form.css";
export default class Form {
  form: HTMLFormElement;
  constructor() {
    this.form = document.createElement("form");
    this.createForm();
  }

  createForm() {
    const inputName = new FormItem("name", "Имя", "form__item", "Введите имя");
    const inputAdress = new FormItem(
      "adress",
      "Адрес",
      "form__adress",
      "Введите адрес"
    );
    const inputPhone = new FormItem(
      "phone",
      "Телефон",
      "form__phone",
      "Адресс телефон"
    );
    this.form.append(
      inputName.returnElement(),
      inputAdress.returnElement(),
      inputPhone.returnElement()
    );
  }
  getForm() {
    return this.form;
  }
}
