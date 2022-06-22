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
          ...game,
          title: game.name,
          platforms: game.platforms.map( (platform) => {
            return {
              platform_id: platform.platform.id,
              platform_name: platform.platform.name
            }
          }) 
        };
      } catch (error) {
        throw error;
      }
    },
    screenshots: async (parent, { id }, { dataSources }) => {
      try {
        const screenshots = await dataSources.videogameApi.getScreenshots(id);
        return {
          count: screenshots.count,
          next: screenshots.next,
          previous: screenshots.previous,
          results: screenshots.results.map((screenshot) => ({
            screenshot_id: screenshot.id,
            image: screenshot.image,
            width: screenshot.width,
            height: screenshot.height,
            is_deleted: screenshot.is_deleted
          })),
        };
      } catch (error) {
        throw error;
      }
    }
  },
};
