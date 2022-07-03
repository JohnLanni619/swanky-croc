import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const GET_PLATFORMS = gql`
  query getPlatforms {
    platforms {
      count
      next
      previous
      results {
        platform_id
        platform_name
      }
    }
  }
`;

export default function PlatformList() {
  const { loading, error, data } = useQuery(GET_PLATFORMS);
  if (loading) return (
    <Loading />
  )
  if (error)return ( 
    <p>Error :(</p>
  )

  return(
    <main className="platform-grid">
      {data.platforms.results.map( (platform) => {
        return (
          <div id={platform.platform_name.replaceAll(" ","-").replaceAll("/","").replace("3DO","pana")} className="platform-card" key={platform.platform_id}>
            <h3>{platform.platform_name}</h3>
          </div>
        )
      })}
    </main>
  )
}