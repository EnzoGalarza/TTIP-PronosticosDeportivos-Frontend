import React, { useEffect, useState } from "react";
import { getPredictions, getMatches } from "../api/Requests"
import Navbar from "./Navbar";
import "../styles/Matches.css"
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const Matches = () => {
    const { compId } = useParams();
    const predictions = []

    

    const [matchesData, setMatchesData] = useState({
        matches: []
    })

    const [predictionsData, setPredictionsData] = useState(predictions)

    const updatePredictions = () => {
        getPredictions("pedro")
        .then((response) => {
            setPredictionsData(
                response.data
            )
        }).catch((error) => {console.log(error)})
    }

    const updateMatches = () => {
        getMatches(compId)
        .then((response) => {
            setMatchesData({
                matches: response.data
            })
        })
        .catch((error) => {console.log(error)})
    }

    const updateLocalPredictions = (prediction) => {
        setPredictionsData(current => current.map(predic =>{
            if(predic.matchId === prediction.matchId){
                return {...predic, localGoals: predic.localGoals+1}
            }    
            return predic
        }))
    }

    const addLocalGoal = (id) => {
        const prediction =  predictionsData.find((p) => {
                                return p.matchId === id;
                            })
        console.log("Encontre prediciton: ",prediction)
        if(!prediction){
            const newPrediction = {
                user: "pedro",
                matchId: id,
                localGoals: 0,
                awayGoals: 0,
            }
            setPredictionsData(current => [...current, newPrediction])

            console.log("No encontre prediction, armo: ", newPrediction)
            return
        }
        updateLocalPredictions(prediction)
        console.log(predictionsData)
        
    }

    useEffect(() => {
        updateMatches();
        updatePredictions();
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
                        <div id= "match" className="card">
                            <div className="card-header">
                                    {match.status === "SCHEDULED" ? match.utcDate : match.status}
                            </div> 

                            <div id= "matchBody" className="card-body">
                                <div className="team"> 
                                        <img src={match.homeTeam.crest} className="teamCrest" alt={match.homeTeam.name} />
                                        <div className="teamName">{match.homeTeam.name}</div>
                                </div>     

                                <div className="team">
                                        {match.status === "FINISHED" ? 
                                        <div className="result">
                                            Resultado: <br></br>
                                            {match.score.fullTime.home} - {match.score.fullTime.away}
                                            <br></br>
                                            {predictionsData.map(prediction => {
                                                return(<div>
                                                        {match.id === prediction.matchId ? 
                                                            <div>
                                                                Tu Pronostico:
                                                                {prediction.localGoals} - {prediction.awayGoals}
                                                            </div>
                                                        : null}
                                                    </div>)
                                            })}
                                        </div>
                                        : 
                                        <div className="prediction">
                                            
                                            <Button color="primary" id="localPlusBtn" type="button" className="btn" onClick={() => addLocalGoal(match.id)}>
                                                +
                                            </Button>
                                            <Button color="primary" id="awayPlusBtn" type="button" className="btn" onClick={() => addLocalGoal(match.id)}>
                                                +
                                            </Button>
                                            <div className="predictionSeparator"> - </div>
                                            <Button color="primary" id="localMinusBtn" type="button" className="btn" onClick={() => addLocalGoal(match.id)}>
                                                -
                                            </Button>
                                            <Button color="primary" id="awayMinusBtn" type="button" className="btn" onClick={() => addLocalGoal(match.id)}>
                                                -
                                            </Button>
                                        </div>
                                        }
                                </div> 
                                    
                                <div className="team">
                                        <img src={match.awayTeam.crest} className="teamCrest" alt={match.awayTeam.name} />
                                        <div className="teamName">{match.awayTeam.name}</div>
                                </div>
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