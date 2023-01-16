import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Link from 'next/link';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import Loading from "./Loading";

const GET_GAMES = gql`
  query getAllGames($page: Int, $ordering: String, $search: String) {
    gamesList(page: $page, ordering: $ordering, search: $search) {
      count
      next_page
      previous_page
      results {
        id
        title
        released
        background_image
        metacritic
      }
    }
  }
`;

export default function GameCard() {
  let [page, setPage] = useState(1);
  let [order, setOrder] = useState("null");
  let [search, setSearch] = useState("pokemo");

  let { loading, error, data } = useQuery(GET_GAMES, {
    variables: {
      page: page,
      ordering: order,
      search: search
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return (
    <Loading />
  )
  if (error) {
    return <p>{error.message}</p>}

  let maxPage = Math.round(data.gamesList.count / 20)

  return (
    <div className="container">
      <div className="button-container">
        <button
          className="arrow"
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page <= 1 ? true : false}
        >
          <AiOutlineDoubleLeft className="icon left" />
        </button>
        <div className="form-container">
          <h3>{`Page ${page} of ${maxPage}`}</h3>
          <form onSubmit={(e) => {
            e.preventDefault(); 
            setPage(parseInt(e.target[0].value))
          }}>
            <input type="number" ></input>
            <button>Go</button>
          </form>
        </div>
        <button
          className="arrow"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === maxPage ? true : false}
        >
          <AiOutlineDoubleRight className="icon right" />
        </button>
      </div>
      <div className="grid">
        {data.gamesList.results.map((game) => {
          return (
            <Link to={game.id}>
              <div
                key={game.id}
                style={{ backgroundImage: `url(${game.background_image})` }}
                className="game-card"
              >
                {game.released && 
                  <h3>{game.title + " (" + game.released.split("-")[0] + ")"}</h3>
                }
                {!game.released &&
                  <h3>{game.title}</h3>
                }
                
                <span>{game.metacritic}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
