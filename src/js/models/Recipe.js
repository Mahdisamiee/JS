import axios from "axios";
import { app_key, app_id, proxy } from "../config";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const recipe = await axios(
        `${proxy}https://api.edamam.com/search?q=pizza&app_id=${app_id}&app_key=${app_key}&to=1`
      );
      this.title = recipe.data.hits[0].recipe.label;
      this.img = recipe.data.hits[0].recipe.image;
      this.author = recipe.data.hits[0].recipe.source;
      this.url = recipe.data.hits[0].recipe.url;
      this.ingredients = recipe.data.hits[0].recipe.ingredients.map(
        (cur) => cur.text
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  calcTime() {
    let num = this.ingredients.length;
    let period = Math.ceil(num / 3);
    this.time = period * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
      "g",
      "x",
      "pinch",
    ];
    const newIngredients = this.ingredients.map((el) => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, "");

      // 3) Parse ingredients into count, unit and ingredient

      return ingredient;
    });
    this.ingredients = newIngredients;
  }
}
