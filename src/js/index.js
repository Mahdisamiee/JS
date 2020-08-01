import Search from "./models/Search";

/** Define Global State
 * - Search Object
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipe
 */
const state = {};

async function controlSearch() {
  // 1- get query from view
  const query = "pizza";

  if (query) {
    // 2) New search object and add to state;
    state.search = new Search(query);

    // 3) Prepare UI for result

    // 4) Search for recipe
    await state.search.getResults();
    // 5) Render result on UI
    console.log(state.search.result);
  }
}

document.querySelector("form.search").addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});
