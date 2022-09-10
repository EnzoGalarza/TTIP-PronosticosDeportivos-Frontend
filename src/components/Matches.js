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

    const [pronosticosData, setPronosticosData] = useState({
        pronosticos: []
    })

    const updatePronosticos = () => {
        api.getPronosticos("pedro")
        .then((response) => {
            setPronosticosData({
                pronosticos: response.data
            })
        }).catch((error) => {console.log(error)})
    }

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
        updatePronosticos();
    },[compId]);

    return (
        <>  
            <header>
                <Navbar/>
            </header>
            <div class="matches-page">
            { matchesData.matches.length > 0 &&
                (<div className="matches">
                    {matchesData.matches.map(match =>{
                        return(
                        <div className="match">
                           <div>
                                {match.status === "SCHEDULED" ? match.utcDate : match.status}
                           </div> 

                           <div className="team"> 
                                <img src={match.homeTeam.crest} className="teamCrest" alt={match.homeTeam.name} />
                                <div className="teamName">{match.homeTeam.name}</div>
                           </div>     

                           <div className="team">
                                {match.status === "FINISHED" ? 
                                <div>
                                    <div className="resultado">
                                        Resultado: <br></br>
                                            {match.score.fullTime.home} - {match.score.fullTime.away}
                                        <br></br>
                                        Tu Pronostico:
                                            {pronosticosData.pronosticos.map(pronostico => {
                                                return(<div>
                                                        {match.id === pronostico.idPartido ? 
                                                            <div>
                                                                {pronostico.rlocal} - {pronostico.rvisitante}
                                                            </div>
                                                        : null}
                                                    </div>)
                                            })}
                                    </div>
                                </div> : null
                                }
                           </div> 
                            
                           <div className="team">
                                <img src={match.awayTeam.crest} className="teamCrest" alt={match.awayTeam.name} />
                                <div className="teamName">{match.awayTeam.name}</div>
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