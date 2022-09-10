import React, { useEffect, useState} from "react";
import api from "../api/Requests"
import Navbar from "./Navbar";
import "../styles/Matches.css"
import { useParams } from 'react-router-dom';

const Matches = () => {
    const { compId } = useParams();

    const [matchesData, setMatchesData] = useState({
        matches: []
    })

    const updateMatches = () => {
        api.getMatches(compId)
        .then((response) => {
            setMatchesData({
                matches: response.data
            })
        })
        .catch((error) => {console.log(error)})
    }

    useEffect(() => {
        updateMatches();
    },[compId]);

    return (
        <>  
            <header>
                <Navbar/>
            </header>
            <div class="matches-page">
            { matchesData.matches.length > 0 &&
                (<div class="matches">
                    {matchesData.matches.map(match =>{
                        return(
                        <div class="match">
                           <div>
                                {match.status == "SCHEDULED" ? match.utcDate : match.status}
                           </div> 

                           <div class="team"> 
                                <img src={match.homeTeam.crest} class="teamCrest" alt={match.homeTeam.name} />
                                <div class="teamName">{match.homeTeam.name}</div>
                           </div>     

                           <div class="team">
                                {match.status == "FINISHED" ? 
                                <div>
                                    <div class="resultado">
                                        Resultado: <br></br>
                                            {match.score.fullTime.home} - {match.score.fullTime.away}
                                        <br></br>
                                        Tu Pronostico:
                                            {}
                                    </div>
                                </div> : null
                                }
                           </div> 
                            
                           <div class="team">
                                <img src={match.awayTeam.crest} class="teamCrest" alt={match.awayTeam.name} />
                                <div class="teamName">{match.awayTeam.name}</div>
                           </div> 
                        </div>
                        
                        )
                    })}
                </div>
                )}
            </div>
        </>
        
    )

}

export default Matches;