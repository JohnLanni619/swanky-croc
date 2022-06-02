const { RESTDataSource } = require("apollo-datasource-rest");

class videogameApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.rawg.io/api/";
  }

  async getAllGames() {
    return this.get("/games", {
      key: this.context.token,
    });
  }

  async getGameById(id) {
    return this.get(`/games/${id}`, {
      key: this.context.token,
    });
  }
}

module.exports = videogameApi;
