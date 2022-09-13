import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import { getCompetitions } from "../api/Requests"
import Navbar from "./Navbar";

const Home = () => {

    const [competitionsData, setCompetitionsData] = useState({
        competitions: []
    })

    const navigate = useNavigate(); 

    const updateCompetitions = () => {
        getCompetitions()
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
                        <div class="competition">
                            <img src={competition.emblem} class="comppic" alt={competition.name} onClick={() => competitionMatches(competition.code)}/>
                            <div class="compText">{competition.name}</div>
                        </div>
                        )
                    })}
                </div>
                )}
            </div>
        </>
    )

}

export default Home;