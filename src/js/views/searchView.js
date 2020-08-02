import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
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

export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe);
};
