import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const app_key = "dd8d8352e7726a74a03d38131c784922";
    const app_id = "cc230124";

    try {
      const res = await axios(
        `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${app_key}&to=30`
      );
      this.result = res.data.hits.map((cur) => cur.recipe); // * it return just array of object
    } catch (error) {
      console.log(error.message);
    }
  }
}
