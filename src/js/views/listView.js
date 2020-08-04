import { elements } from "./base";

export const renderItem = (item) => {
  const markup = `
    <li class="shopping__item" data-itemid = "${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.value}" step="${item.value}" class = "shopping__item--value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
  `;

  elements.shopping.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (id) => {
  document.querySelector(`li.shopping__item[data-itemid = "${id}"]`).remove();
};
