import { elements, renderLoader, clearLoader } from "./views/base";
// Search Bar files
import Search from "./models/Search";
import * as searchViews from "./views/searchView";

// Recipe
import Recipe from "./models/Recipe";
import * as recipeView from "./views/recipeView";

// List shopping
import List from "./models/List";

/** Define Global State
 * - Search Object
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipe
 */
const state = {};

//--------------------------------------------------------------------------------------
/** Search 
 * functions for search bar.
 */
async function controlSearch() {
  // 1- get query from view
  const query = searchViews.getInput();
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

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (event) => {
  const target = event.target.closest("button[data-goto]");
  if (!target) return;
  searchViews.clearResults();
  searchViews.renderResults(state.search.result, +target.dataset.goto);
});

//------------------------------------------------------------------------------------
/** RECIPE
 *  functions
 *  and events
 */
async function controlRecipe(event) {
  // Get the id
  const id = window.location.hash;

  if (id) {
    // Prepare UI for change
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    if (state.search) recipeView.highlightedSelected(id);

    // Create recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and make Ingredients uniform
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calc servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      clearLoader();
      console.error(error.messge);
    }
  }
}

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener('load',controlRecipe);
["load", "hashchange"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// event listener for increase and decrease btn .
// it can change number of servings
// and count of each ingredient for that number of people

elements.recipe.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".btn-decrease, .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateRecipeIngredinets(state.recipe);
    }
  }
  if (target.matches(".btn-increase, .btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateRecipeIngredinets(state.recipe);
  }
});

//--------------------------------------------------------------------------------------
/**Shopping
 * Shopping List
 */
state.list = new List();
state.list.addItem(10, "g", "somehtinfd fgnsdfng");
state.list.addItem(3, "tsp", "new stuff");
state.list.addItem(1, "cup", "for teasete");
state.list.addItem(50, "g", "somehtinfd fgnsdfng");
window.r = state.list;
