import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchPage.innerHTML = "";
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
            <a class="results__link " href="#${parseInt(recipe.calories)}">
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

const renderButtons = (page) => {
  const prevbtn = `
    <button class="btn-inline results__btn--prev" data-page= "${page - 1}">
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-left"></use>
      </svg>
      <span>Page ${page - 1}</span>
    </button>
  `;
  const nextbtn = `
    <button class="btn-inline results__btn--next" data-page= "${page + 1}">
      <span>Page ${page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
      </svg>
    </button>
  `;
  return [prevbtn, nextbtn];
};
const eventButton = (recipes) => {
  elements.searchPage.addEventListener("click", (event) => {
    let target = event.target.closest("button[data-page]");
    if (!target) return;

    clearResults();
    renderResults(recipes, +target.dataset.page);
  });
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  const [prev, next] = renderButtons(page);
  if (page == 1 || page * resPerPage < recipes.length) {
    elements.searchPage.insertAdjacentHTML("afterbegin", next);
  }
  if (page > 1) {
    elements.searchPage.insertAdjacentHTML("afterbegin", prev);
  }
  eventButton(recipes);
};
