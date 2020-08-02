import { elements, renderLoader, clearLoader } from "./views/base";
// Search Bar files
import Search from "./models/Search";
import * as searchViews from "./views/searchView";

//

/** Define Global State
 * - Search Object
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipe
 */
const state = {};

// function for search bar.
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

    // 4) Search for recipe
    await state.search.getResults(); // we use await cause async method or function(this method is in Search class) return a Promise

    // 5) Render result on UI
    clearLoader();
    searchViews.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});
