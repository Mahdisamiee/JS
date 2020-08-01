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
        `https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${app_key}`
      );
      this.result = res.data.hits;
    } catch (error) {
      console.log(error.message);
    }
  }
}
