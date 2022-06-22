import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import Nav from '../components/Nav';
import Screenshot from "../components/Screenshots";

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
    const [image, setImage] = useState("")

    let { id } = useParams();

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: {
            gameId: id 
        },
        onCompleted: data => setImage(data.game.background_image)
    });

    if (loading) return (
        <Loading />
    )
    if (error) {
        return <p>{error.message}</p>
    }

    const { background_image, description, metacritic, released, title, website } = data.game;

    function handleCallback(childData) {
        setImage(childData)
    }

 
    return (
        <>
            <Nav />
            <div id="single-game-card">
                <h1 className="title">{title}</h1>
                <div className="layout">
                    <div className="card">
                        <div className="image-container">
                            <img selected src={image} alt="background" width="500px"/>
                            <Screenshot id={id} parentCallback={handleCallback} />
                        </div>
                        <p id="description" className="description">{description.replaceAll(/<p>|<\/p>|<br \/>/g,"")}</p>
                    </div>
                </div>
            </div>
        </>
        
    );
}