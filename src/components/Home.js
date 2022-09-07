import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import api from "../api/Requests"
import Navbar from "./Navbar";

const Home = () => {

    const [competitionsData, setCompetitionsData] = useState({
        competitions: []
    })

    const navigate = useNavigate(); 

    const updateCompetitions = () => {
        api.getCompetitions()
        .then((response) => {
            setCompetitionsData({
                competitions: response.data
            })
        })
        .catch((error) => {console.log(error)})
    }

    const competitionMatches = (id) => {
        navigate(`/matches/${id}`);
    };

    useEffect(() => {
        updateCompetitions();
    },[]);

    return (
        <>  
            <header>
                <Navbar/>
            </header>
            <div class="home">
            { competitionsData.competitions.length > 0 &&
                (<div class="competitions">
                    {competitionsData.competitions.map(competition =>{
                        return(
                        <span>
                            <figure class="competition" onClick={() => competitionMatches(competition.code)}>
                                <img src={competition.emblem} class="comppic" alt={competition.name}/>
                                <figcaption>{competition.name}</figcaption>
                            </figure>
                        </span>
                        )
                    })}
                </div>
                )}
            </div>
        </>
    )

}

export default Home;