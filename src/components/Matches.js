import React, { useEffect, useState } from "react";
import { getPredictions, getMatches, getCurrentMatchDay, savePronostics } from "../api/Requests"
import Navbar from "./Navbar";
import "../styles/Matches.css"
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import NumericInput from 'react-numeric-input';
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css'

const Matches = () => {
    const { compId } = useParams();
    const predictions = [];

    const [matchesData, setMatchesData] = useState({
        matches: []
    })

    const [matchDayOptionsData, setMatchDayOptionsData] = useState({
        matchDayOptions: []
    })

    const [predictionsData, setPredictionsData] = useState(predictions)

    const updatePredictions = () => {
        getPredictions("pedro")
        .then((response) => {
            setPredictionsData(
                response.data
            )
        }).catch((error) => {console.log(error)})
    };

    const updateMatches = (matchDay) => {
        getMatches(compId, matchDay)
        .then((response) => {
            setMatchesData({
                matches: response.data
            })
        })
        .catch((error) => {console.log(error)})
    };
    
    const updateMatchesData = () => {
        getCurrentMatchDay(compId)
        .then((response) => {
            updateMatchDayOptions(response.data)
            updateMatches(response.data);
        })
        .catch((error) => {console.log(error)})
    };

    const updatePredictionGoals = (prediction, team, goals) => {
        setPredictionsData(current => current.map(predic =>{
            if(predic.matchId === prediction.matchId){
                if(team === "L"){
                    return {...predic, localGoals: goals}
                }
                if(team === "A"){
                    return {...predic, awayGoals: goals}
                }
            }    
            return predic
        }))
    };

    const updateGoal = (id, team, goals) => {
        console.log("Goles " + goals)
        var prediction =  predictionsData.find((p) => {
                                return p.matchId === id;
                            })

        if(!prediction){
            prediction = {
                user: "pedro",
                matchId: id,
                localGoals: 0,
                awayGoals: 0,
            }
            setPredictionsData(current => [...current, prediction])
        }
        updatePredictionGoals(prediction, team, goals)
        console.log(predictionsData)
        
    };

    const updateMatchDayOptions = (matchDay) => {
        var matchDays = []
        var newMatchDay
        while(matchDay > 0){
            newMatchDay = {
                value: matchDay, 
                label: `Fecha ${matchDay}`
            }
            matchDay = matchDay - 1;
            matchDays.push(newMatchDay)
        }
        console.log(matchDays);
        setMatchDayOptionsData({
            matchDayOptions: matchDays
        })
        console.log(matchDayOptionsData.matchDayOptions)
    };

    const savePredictions = () =>{
        console.log("Predicciones a guardar o modificar : ", predictionsData)
        savePronostics(predictionsData)
            .then((response) =>{ 
                console.log(response.data)}
            )
            .catch((error) =>{ 
                console.log(error)}
            )
    };

    const handleSelectionChange = (event) => {
        updateMatches(event.value)
    };

    useEffect(() => {
        updateMatchesData();
        updatePredictions();
    },[]);

    return (
        <>  
            <header>
                <Navbar/>
            </header>
            <div class="matches-page">
                <div className="matchDaySelection">
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={matchDayOptionsData.matchDayOptions[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSercheable={true}
                        name="Fecha"
                        options={matchDayOptionsData.matchDayOptions}
                        onChange={handleSelectionChange}
                    />
                </div>
                <div className="matches">
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

                                <div className="goals">
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
                                            <NumericInput 
                                                      min={0} 
                                                      className="localResInput"
                                                      placeholder="Local"
                                                      onChange={value => updateGoal(match.id, "L", value)}
                                                      />
                                            <NumericInput 
                                                      min={0} 
                                                      className="awayResInput"
                                                      placeholder="Visitante"
                                                      onChange={value => updateGoal(match.id, "A", value)}
                                                      />
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
                
            </div>
            <div>
                    <Button color="primary" id="saveBtn" type="button" className="savePredictionsBtn" onClick={() => savePredictions()}>
                        Guardar pronósticos
                    </Button>
            </div>
        </>
        
    )

}

export default Matches;