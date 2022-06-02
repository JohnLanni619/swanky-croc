import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

const GET_GAMES = gql`
  query getAllGames($page: Int) {
    gamesList(page: $page) {
      count
      next_page
      previous_page
      results {
        id
        title
        released
        background_image
      }
    }
  }
`;

export default function GameCard() {
  let [page, setPage] = useState(1);
  let { loading, error, data } = useQuery(GET_GAMES, {
    variables: {
      page: page,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div class="container">
      <div className="button-container">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page <= 1 ? true : false}
        >
          <AiOutlineDoubleLeft className="icon left" />
        </button>
        <h3>{`Page ${page} of ${data.gamesList.count / 20}`}</h3>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <AiOutlineDoubleRight className="icon right" />
        </button>
      </div>
      <div className="grid">
        {data.gamesList.results.map((game) => {
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
    </div>
  );
}
