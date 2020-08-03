import axios from "axios";
import { app_key, app_id, proxy } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${app_key}&to=30`
      );
      this.result = res.data.hits.map((cur) => cur.recipe); // * it return just array of object
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
}
