import { elements, renderLoader, clearLoader } from "./views/base";
// Search Bar files
import Search from "./models/Search";
import * as searchViews from "./views/searchView";

//
import Recipe from "./models/Recipe";

/** Define Global State
 * - Search Object
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipe
 */
const state = {};

/**  *********************************************************************************************
 * functions for search bar.
 */
async function controlSearch() {
  // 1- get query from view
  // const query = searchViews.getInput();
  const query = "pizza";
  if (query) {
    // 2) New search object and add to state;
    state.search = new Search(query);

    // 3) Prepare UI for result
    searchViews.clearInput();
    searchViews.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipe
      await state.search.getResults(); // we use await cause async method or function(this method is in Search class) return a Promise

      // 5) Render result on UI
      clearLoader();
      searchViews.renderResults(state.search.result);
    } catch (err) {
      clearLoader(); // we still want to clear loader after error too.
      console.error(err.message);
    }
  }
}

// elements.searchForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   controlSearch();
// });

//TEST
window.addEventListener(
  "load",
  controlSearch
); /****************************** */

elements.searchResPages.addEventListener("click", (event) => {
  const target = event.target.closest("button[data-goto]");
  if (!target) return;
  searchViews.clearResults();
  searchViews.renderResults(state.search.result, +target.dataset.goto);
});

/** RECIPE
 *  functions
 *  and events
 */
async function controlRecipe(event) {
  // Get the id
  const id = window.location.hash;

  if (id) {
    // Prepare UI for change

    // Create recipe object
    state.recipe = new Recipe(id);

    //test
    window.r = state.recipe;

    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // Calc servings time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (error) {
      console.error(error.messge);
    }
  }
}

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener('load',controlRecipe);
["load", "hashchange"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
