import React, { useEffect, useState } from "react";
import { getPredictions, getMatches, getCurrentMatchDay, savePronostics } from "../api/Requests"
import Match from "./Match";
import Navbar from "./Navbar";
import "../styles/Matches.css"
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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

    const findPrediction = (code) => {
        return predictionsData.find((prediction) => {
            return prediction.match.code === code;
        });
    };

    const updatePredictionGoals = (prediction, team, goals) => {
        setPredictionsData(current => current.map(predic =>{
            if(predic.match.code === prediction.match.code){
                if(team === "HOME"){
                    return {...predic, localGoals: goals}
                }
                if(team === "AWAY"){
                    return {...predic, awayGoals: goals}
                }
            }    
            return predic
        }))
    };

    const updateGoal = (matchToSave, team, goals) => {
        console.log("Goles " + goals)
        var newPrediction =  findPrediction(matchToSave.id)

        if(!newPrediction){
            newPrediction = {
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
            setPredictionsData(current => [...current, newPrediction])
        }
        updatePredictionGoals(newPrediction, team, goals)
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
        const prediction =  findPrediction(code)
        if(prediction){
            if(team === "HOME"){
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
                    {matchesData.matches.map(match => <Match match={match} getPredictionGoals={getPredictionGoals} updateGoal={updateGoal}/>)}
                    
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