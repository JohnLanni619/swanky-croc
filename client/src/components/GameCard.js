import { gql, useQuery } from "@apollo/client";

const GET_GAMES = gql`
  query getAllGames {
    games {
      id
      title
      released
      background_image
    }
  }
`;

export default function GameCard() {
  const { loading, error, data } = useQuery(GET_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="grid">
      {data.games.map((game) => {
        return (
          <div
            key={game.id}
            style={{ backgroundImage: `url(${game.background_image})` }}
            className="game-card"
          >
            <h3>{game.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
