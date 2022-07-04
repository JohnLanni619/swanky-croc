module.exports = {
  Query: {
    gamesList: async (parent, { page, ordering, search }, { dataSources }) => {
      try {
        const allGames = await dataSources.videogameApi.getAllGames(page, ordering, search);
        return {
          count: allGames.count,
          next_page: allGames.next,
          previous_page: allGames.previous,
          results: allGames.results.map((game) => ({
            id: game.id,
            title: game.name,
            released: game.released,
            background_image: game.background_image,
            metacritic: game.metacritic
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
    screenshotList: async (parent, { id }, { dataSources }) => {
      try {
        const screenshots = await dataSources.videogameApi.getScreenshots(id);
        return {
          count: screenshots.count,
          next: screenshots.next,
          previous: screenshots.previous,
          list: screenshots.results.map( (screenshot) => {
            return {
              screenshot_id: screenshot.id,
              width: screenshot.width,
              height: screenshot.height,
              image: screenshot.image,
              is_deleted: screenshot.is_deleted
            }
          })
        };
      } catch (error) {
        throw error;
      }
    },
    platforms: async (parent, args, { dataSources }) => {
      try {
        const platforms = await dataSources.videogameApi.getPlatforms();
        return {
          count: platforms.count,
          next: platforms.next,
          previous: platforms.previous,
          results: platforms.results.map( (platform) => {
            return {
              platform_id: platform.id,
              platform_name: platform.name
            }
          })
        }
      } catch (error) {
        throw error;
      }
    },
    platform: async (parent, { id }, { dataSources }) => {
      try {
        const platform = await dataSources.videogameApi.getPlatformById(id);
        return {
          id: platform.id,
          name: platform.name,
          games_count: platform.games_count,
          description: platform.description
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
