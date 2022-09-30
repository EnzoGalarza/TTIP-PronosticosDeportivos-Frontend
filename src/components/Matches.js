import React, { useEffect, useState } from "react";
import { getPredictions, getMatches, getCurrentMatchDay, savePronostics } from "../api/Requests"
import Navbar from "./Navbar";
import "../styles/Matches.css"
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import NumericInput from 'react-numeric-input';
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from "react-bootstrap";

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
        getPredictions(localStorage.getItem("user"))
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
            if(predic.match.code === prediction.match.code){
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

    const updateGoal = (matchToSave, team, goals) => {
        console.log("Goles " + goals)
        var prediction =  predictionsData.find((p) => {
                                return p.match.code === matchToSave.id;
                            })

                            console.log("El match que voy a guardar es: ", matchToSave)

        if(!prediction){
            prediction = {
                user: localStorage.getItem("user"),
                match: {
                    homeTeam: matchToSave.homeTeam,
                    awayTeam: matchToSave.awayTeam,
                    date: matchToSave.utcDate,
                    localGoals: matchToSave.score.fullTime.home,
                    awayGoals: matchToSave.score.fullTime.away,
                    code: matchToSave.id,
                    status: matchToSave.status,
                    matchDay: matchToSave.matchday,
                    competition: compId
                },
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
        //console.log("Predicciones a guardar o modificar : ", predictionsData)
        savePronostics(predictionsData)
            .then((response) =>{ 
                console.log(response.data)}
            )
            .catch((error) =>{ 
                console.log(error)}
            )
    };

    const getPredictionGoals = (code, team) =>{
        const prediction =  predictionsData.find((p) => {
            return p.match.code === code;
        })
        if(prediction){
            if(team === "L"){
                return prediction.localGoals
            }
            return prediction.awayGoals
        }
        return null
    }

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
                <div className="matches">
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
                    {matchesData.matches.map(match =>{
                        return(
                        <div id= "match" className="card">
                            <div className="card-header">
                                    {match.status === "SCHEDULED" || match.status === "TIMED" ? match.localDate : match.status}
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
                                            {getPredictionGoals(match.code, "L") !== null &&
                                             getPredictionGoals(match.code, "A") !== null ?
                                                <div>
                                                    Tu Pronóstico: <br></br>
                                                    {getPredictionGoals(match.id, "L")} - {getPredictionGoals(match.id, "A")}
                                                </div>
                                                : 
                                                <div>
                                                    Sin pronosticar
                                                </div>
                                            /*predictionsData.map(prediction => {
                                                return(<div>
                                                        {match.id === prediction.matchId ? 
                                                            <div>
                                                                Tu Pronostico:
                                                                {prediction.localGoals} - {prediction.awayGoals}
                                                            </div>
                                                        : null}
                                                    </div>)
                                            })*/}
                                        </div>
                                        : 
                                        <div className="prediction">
                                            <NumericInput 
                                                      min={0} 
                                                      value={getPredictionGoals(match.id, "L")}
                                                      className="localResInput"
                                                      placeholder="Local"
                                                      onChange={value => updateGoal(match, "L", value)}
                                                      />
                                            <NumericInput 
                                                      min={0}
                                                      value={getPredictionGoals(match.id, "A")}
                                                      className="awayResInput"
                                                      placeholder="Visitante"
                                                      onChange={value => updateGoal(match, "A", value)}
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
                <nav>
                    <Button color="primary" id="saveBtn" type="button" className="savePredictionsBtn" onClick={() => savePredictions()}>
                        Guardar pronósticos
                    </Button>
                </nav>
            </div>
            
        </>
        
    )

}

export default Matches;