import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const GET_GAME = gql`
    query getGameById($gameId: ID!) {
        game(id: $gameId) {
            id
            title
            released
            background_image
            website
            description
            metacritic
            platforms {
                platform_id
                platform_name
            }
        }
    }
`

export default function SingleGame() {
    let { id } = useParams();

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: {
            gameId: id 
        }
    });

    if (loading) return (
        <Loading />
    )
    if (error) {
        return <p>{error.message}</p>
    }

    const { background_image, description, metacritic, released, title, website } = data.game;
    
    return (
        <div>
            <img src={background_image} alt="background" width="100%"/>
            <h1>{title}</h1>
            <p id="description">{description.replaceAll(/<p>|<\/p>|<br \/>/g,"")}</p>
        </div>
    );
    
}