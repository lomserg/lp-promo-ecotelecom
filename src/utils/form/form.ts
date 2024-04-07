import { FormItem } from "./inputs/inputs";
import "./form.css";
import Button from "./inputs/button";

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
    const button = new Button("Подключить");
    this.form.append(
      inputName.returnElement(),
      inputAdress.returnElement(),
      inputPhone.returnElement(),
      button.returnElement()
    );
  }
  getForm() {
    return this.form;
  }
}
