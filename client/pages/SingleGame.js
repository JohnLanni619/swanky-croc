import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
            background_image_additional
            website
            description
            metacritic
            platforms {
                platform_id
                platform_name
            }
        }
    }
`;

export default function SingleGame() {
    const [image, setImage] = useState("")

    let { id } = useParams();

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: {
            gameId: id 
        },
        onCompleted: data => {
            setImage(data.game.background_image_additional || data.game.background_image);    
        },
    });

    useEffect(() => {
        let p = document.querySelector('.description')
        if (data) {
            p.innerHTML = data.game.description
        };
        let background = document.querySelector('#single-game-card');
        if (background) {
            background.style.backgroundImage = `url(${data.game.background_image})`
        }
    });

    if (loading) return (
        <Loading />
    )
    if (error) {
        return <p>{error.message}</p>
    }

    const { title, website } = data.game;

    function handleCallback(childData) {
        setImage(childData)
    }

    return (
        <>
            <Nav />
            <div id="single-game-card">
                <div className="overlay"></div>
                <a href={website} target="__blank">
                    <h1 className="title">{title}</h1>
                </a>
                <div className="layout">
                    <div className="card">
                        <div className="image-container">
                            <img selected src={image} alt="background" width="600px"/>
                            <Screenshot id={id} parentCallback={handleCallback} />
                        </div>
                        <p id="description" className="description"></p>
                    </div>
                </div>
            </div>
        </>
        
    );
}