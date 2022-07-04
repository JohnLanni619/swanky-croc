import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Nav from '../components/Nav';

const ps5Description = "The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. Announced in 2019 as the successor to the PlayStation 4, the PS5 was released on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, with worldwide release following a week later. The PS5 is part of the ninth generation of video game consoles, along with Microsoft's Xbox Series X and Series S consoles, which were released in the same month.The base model includes an optical disc drive compatible with Ultra HD Blu-ray discs. The Digital Edition lacks this drive, allowing it to serve as a lower-cost model for those who prefer to buy games through digital download. The two variants were launched simultaneously.The PlayStation 5's main hardware features include a solid-state drive customized for high-speed data streaming to enable significant improvements in storage performance, an AMD GPU capable of 4K resolution display at up to 120 frames per second, hardware-accelerated ray tracing for realistic lighting and reflections, and the Tempest Engine allowing for hardware-accelerated 3D audio effects. Other features include the DualSense controller with haptic feedback and backward compatibility with the majority of PlayStation 4 and PlayStation VR games."
const seriesXDescription = "The Xbox Series X and the Xbox Series S (collectively, the Xbox Series X/S[b]) are home video game consoles developed by Microsoft. They were both released on November 10, 2020, as the fourth generation of the Xbox console family, succeeding the Xbox One. Along with Sony's PlayStation 5, also released in November 2020, the Xbox Series X and Series S are part of the ninth generation of video game consoles. The Xbox Series X has higher-end hardware and supports higher display resolutions (up to 8K resolution), along with higher frame rates and real-time ray tracing; it also has a high-speed solid-state drive (SSD) to reduce loading times. The less expensive Xbox Series S uses the same CPU, but has a less powerful GPU, has less memory and internal storage, and lacks an optical drive. Both consoles are designed to support nearly all Xbox One games, controllers and accessories, including those games from older Xbox consoles supported by Xbox One's backwards compatibility. At launch, Microsoft positioned their first-party games and several third-party games to be available for both Xbox Series X/S and Xbox One to help transition between generations, providing the 'Smart Delivery' distribution framework to freely provide further optimizations of an Xbox One game for either the Xbox Series X or Series S. The consoles are also compatible with the gaming subscription service Xbox Game Pass, as well as the cloud game-streaming platform Xbox Cloud Gaming."

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
            } else if (data.platform.id === "186") {
                p.innerHTML = seriesXDescription;
            } else if (data.platform.id === "187") {
                p.innerHTML = ps5Description;
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
            <Nav />
            <h1>{name}</h1>
            <p id="platform-description"></p>
            <p>{games_count}</p>
        </div>
    )
}