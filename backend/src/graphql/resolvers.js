module.exports = {
    Query: {
        games: async (parent, args, { dataSources } ) => {
            try {
                const allGames = await dataSources.videogameApi.getAllGames();
                return allGames.results.map(game => ({
                    id: game.id,
                    title: game.name,
                    released: game.released,
                    background_image: game.background_image
                }))
            } catch (error) {
                throw error
            }
        },
        game: async (parent, { id }, { dataSources }) => {
            try {
                const game = await dataSources.videogameApi.getGameById(id);
                return {
                    id: game.id,
                    title: game.name,
                    released: game.released,
                    background_image: game.background_image
                }
            } catch (error) {
                throw error
            }
        }
    }
}