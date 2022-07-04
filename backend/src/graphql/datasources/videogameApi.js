const { RESTDataSource } = require("apollo-datasource-rest");

class videogameApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.rawg.io/api/";
  }

  async getAllGames(pageNumber, ordering, search) {
    return this.get("/games", {
      key: this.context.token,
      page: pageNumber,
      ordering: ordering,
      search
    });
  }

  async getGameById(id) {
    return this.get(`/games/${id}`, {
      key: this.context.token,
    });
  }

  async getScreenshots(id) {
    return this.get(`/games/${id}/screenshots`, {
      key: this.context.token,
    });
  }

  async getPlatforms() {
    return this.get("/platforms", {
      key: this.context.token,
    });
  }

  async getPlatformById(id) {
    return this.get(`/platforms/${id}`, {
      key: this.context.token,
    });
  }
}

module.exports = videogameApi;
