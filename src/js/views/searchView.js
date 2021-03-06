import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResPages.innerHTML = "";
  while (!!elements.searchResList.lastElementChild) {
    elements.searchResList.lastChild.remove();
  }
};

const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    return title.substr(0, limit) + " ...";
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
        <li>
            <a class="results__link " href="#${parseInt(
              recipe.calories
            )}" data-tooltip=${recipe.label}>
                <figure class="results__fig">
                    <img src=${recipe.image} alt="${recipe.label}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.label
                    )}</h4>
                    <p class="results__author">${recipe.source}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto = ${
  type === "prev" ? page - 1 : page + 1
}>
      <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            type === "prev" ? "left" : "right"
          }"></use>
      </svg>
  </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // just show next btn
    button = createButton(page, "next");
  } else if (page < pages) {
    // both show
    button = `
    ${createButton(page, "next")}
    ${createButton(page, "prev")}
    `;
  } else if (page === pages && pages > 1) {
    // just show prev btn
    button = createButton(page, "prev");
  }
  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  renderButtons(page, recipes.length, resPerPage);
};
