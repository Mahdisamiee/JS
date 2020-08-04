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

  /**
   * change this.ingredient to {count , unit, ingredent}
   */
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
    ];
    const unit = [...unitsShort, "g", "x", "pinch"];
    const newIngredients = this.ingredients.map((el) => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, "");

      // 3) Parse ingredients into count, unit and ingredient
      let arrIng = ingredient.split(" ");
      let unitIndex = arrIng.findIndex((el) => unit.includes(el));

      let objIng;
      if (unitIndex > -1) {
        // we have num and unit ...
        let countArr = arrIng.slice(0, unitIndex);
        let count;
        if (countArr.length == 1) {
          count = eval(countArr[0]);
        } else {
          count = countArr.reduce((acc, cur) => {
            return acc + eval(cur);
          }, 0);
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // we didnt have unit but we have number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: ingredient.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        // we didnt have unit
        objIng = {
          count: 1,
          unit: "",
          ingredient,
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  updateServings(type) {
    // servings
    const newServings = type == "dec" ? this.servings - 1 : this.servings + 1;

    // ingredient
    this.ingredients.forEach((ing) => {
      ing.count *= newServings / this.servings;
    });

    this.servings = newServings;
  }
}
