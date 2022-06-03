import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import loadingIcon from '../assets/Loading.png';

const GET_GAMES = gql`
  query getAllGames($page: Int, $pageSize: Int) {
    gamesList(page: $page, page_size: $pageSize) {
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
  let [pageSize, setPageSize] = useState(40)
  let { loading, error, data } = useQuery(GET_GAMES, {
    variables: {
      page: page
      // pageSize: pageSize
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return (
    <div class="loading-container">
      <div>
        <h3>More Games are Loading</h3>
        <img src={loadingIcon} width="600px" alt="loading-image" />
      </div>
    </div>
  )
  if (error) {
    return <p>Error :(</p>}

  let maxPage = Math.round(data.gamesList.count / pageSize)

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
