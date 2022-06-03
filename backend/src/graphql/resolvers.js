module.exports = {
  Query: {
    gamesList: async (parent, { page, page_size }, { dataSources }) => {
      try {
        const allGames = await dataSources.videogameApi.getAllGames(page, page_size);
        return {
          count: allGames.count,
          next_page: allGames.next,
          previous_page: allGames.previous,
          results: allGames.results.map((game) => ({
            id: game.id,
            title: game.name,
            released: game.released,
            background_image: game.background_image,
          })),
        };
      } catch (error) {
        throw error;
      }
    },
    game: async (parent, { id }, { dataSources }) => {
      try {
        const game = await dataSources.videogameApi.getGameById(id);
        return {
          id: game.id,
          title: game.name,
          released: game.released,
          background_image: game.background_image,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
