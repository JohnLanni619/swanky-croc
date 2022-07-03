import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Nav from '../components/Nav';

const GET_PLATFORM = gql`
    query getPlatformById($platformId: ID!) {
        platform(id: $platformId) {
            id
            name
            games_count
            description
        }
    }
`

export default function SinglePlatform() {
    let { id } = useParams();

    let p = document.querySelector("#platform-description")

    const { loading, error, data } = useQuery(GET_PLATFORM, {
        variables: {
            platformId: id 
        }
    });

    useEffect(() => {
        let p = document.querySelector('#platform-description')

        if (data) {
            if (data.platform.description.length > 0) {
                p.innerHTML = data.platform.description
            } else if (data.platform.id == 186) {
                p.innerHTML = "Series X"
            } else if (data.platform.id == 187) {
                p.innerHTML = "PS5"
            }
        }

    });

    if (loading) return (
        <Loading />
    );
    if (error) return (
        <p>{error.message}</p>
    );

    const { name, games_count } = data.platform;

    return (
        <div>
            <h1>{name}</h1>
            <p id="platform-description"></p>
            <p>{games_count}</p>
        </div>
    )
}