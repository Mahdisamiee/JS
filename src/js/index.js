import { elements, renderLoader, clearLoader } from "./views/base";
// Search Bar files
import Search from "./models/Search";
import * as searchViews from "./views/searchView";
// Recipe
import Recipe from "./models/Recipe";
import * as recipeView from "./views/recipeView";
// List shopping
import List from "./models/List";
import * as listView from "./views/listView";
// Likes
import Likes from "./models/Likes";
import * as likesView from "./views/likesView";
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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
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

/**Shopping
 * Shopping List
 */
function controlList() {
  // create list if it is not yet create.
  if (!state.list) {
    state.list = new List();
  }
  // prepare UI and list model to show list
  listView.clearList();
  state.list.clearItems();

  // Add ingredinet to list model and UI
  state.recipe.ingredients.forEach((ing) => {
    const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
    listView.renderItem(item);
  });
}

// event for delete button in shop list
elements.shopping.addEventListener("click", (event) => {
  let target = event.target;
  //Handle delete button
  if (target.closest("button.shopping__delete")) {
    let id = target.closest("li").dataset.itemid;
    state.list.deleteItem(id);
    listView.deleteItem(id);

    // Handle change value
  } else if (target.closest(".shopping__item--value")) {
    const newValue = parseFloat(target.value);
    const id = target.closest("li").dataset.itemid;
    state.list.updateCount(id, newValue);
  }
});

/**
 * Like part
 *
 */
function controlLike() {
  // Create like if its not been yet
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // not liked yet
  if (!state.likes.isLiked(currentID)) {
    // 1-Add recipe to likes
    const like = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    // 2-toggle like button class
    likesView.toggleLikeBtn(false);
    // 3-Add like to like list
    likesView.renderLike(like);

    // its liked
  } else {
    // 1-remove recipe to likes
    state.likes.deleteLike(currentID);
    // 2-toggle like button class
    likesView.toggleLikeBtn(true);
    // 3-Remove like from like list
    likesView.deleteLike(currentID);
  }

  likesView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener("load", (event) => {
  state.likes = new Likes();
  //read date from storage
  state.likes.getData();
  //toggle like view box
  likesView.toggleLikeMenu(state.likes?.getNumLikes());
  //render saved likes
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

// event listener for everything that is in recipe page.
//
elements.recipe.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".btn-decrease, .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateRecipeIngredinets(state.recipe);
    }
  } else if (target.matches(".btn-increase, .btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateRecipeIngredinets(state.recipe);

    // adding shop list
  } else if (target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    controlList();

    // adding like controll
  } else if (target.matches(".recipe__love , .recipe__love *")) {
    controlLike();
  }
});
