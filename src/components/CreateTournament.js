import React, {useState, useEffect} from 'react'
import { getCompetitions, getUsers, saveTournament } from "../api/Requests"
import { useNavigate } from "react-router-dom";
import "../styles/CreateTournament.css";
import Navbar from "./Navbar";
import Select from "react-select";
import NumericInput from 'react-numeric-input'
import makeAnimated from "react-select/animated";

const CreateTournament = () => {

    const criteriaOptions = [
        {value: "Complete",    label: "Resultado completo"},
        {value: "Partial",     label: "Resultado parcial"},
        {value: "Approach",    label: "Acercamiento"},
        {value: "WinnerOrTie", label: "Ganador"},
    ];

    const animatedComponents = makeAnimated();

    const criteriaSelection = [];
    const [criteriaSelectionData, setCriteriaSelectionData] = useState(criteriaSelection)
    const [tournamentData, setTournamentData] = useState({
        name: '',
        competition: '',
        creator: localStorage.getItem("user"),
        usersEmail: [localStorage.getItem("user")],
        criteria: []
    })

    const navigate = useNavigate()

    const [competitionsData, setCompetitionsData] = useState({
        competitions: []
    })

    const [competitionPicture, setCompetitionPicture] = useState({
        image: ''
    })

    const [usersData, setUsersData] = useState({
        users: []
    })


    const updateCompetitions = () => {
        getCompetitions()
        .then((response) => {
            setCompetitionsData({
                competitions: response.data
            });
            setTournamentData({
                ...tournamentData,
                competition: response.data[0].code
            });
            setCompetitionPicture({
                image: response.data[0].emblem
            })
        })
        .catch((error) => {console.log(error)})
    }

    const createTournament = () => {
        saveTournament(tournamentData)
            .then(
                navigate("/home")
            )

    }

    const updateUsers = () => {
        getUsers()
            .then((response) =>{
                setUsersData({
                    users: response.data
                })
            })
    }

    const updateScore = (criteriaName, goals) =>{
        setCriteriaSelectionData(current => current.map(criteria =>{
            if(criteria.name === criteriaName){
                return {...criteria, score: goals}
            }
            return criteria
        }))
    }

    const getCriteriaScore = (name) =>{
        var criteria
        criteria = criteriaSelectionData.find((criteriaSelection)=>{

            return criteriaSelection.name === name
        })
        if(criteria){
            return criteria.score
        }
        return 1
    }

    const handleCriteriaSelectionChange = (event) => {
        var newOptions = []
        {event.map(option => {
            newOptions.push({label: option.label, name: option.value, score: getCriteriaScore(option.value)})
        })}
        setCriteriaSelectionData(newOptions)
    };

    const handleNameInputChange = (event) => {
        setTournamentData({
            ...tournamentData,
            [event.target.name] : event.target.value
        })
    }

    const handleCompetitionInputChange = (event) => {
        setCompetitionPicture({
            image: document.querySelector(`option[value="${event.target.value}"]`).dataset.eventImage
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        createTournament()
    }

    useEffect(() => {
        updateCompetitions();
    },[]);

    return(
       <> 
            <header>
                <Navbar />
            </header>
            <div className="container">
                <form className="createTournament" onSubmit={handleSubmit}>
                    <h1 className="tournamentTitle">
                        Nuevo torneo
                    </h1>
                    <Select
                            className="criteriaSelection"
                            classNamePrefix="select"
                            placeholder="Criterios de puntuación"
                            components={animatedComponents}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSercheable={true}
                            name="Fecha"
                            options={criteriaOptions}
                            onChange={handleCriteriaSelectionChange}
                            isMulti
                        />
                    <input 
                        type="text" 
                        placeholder="Nombre" 
                        id="nameInput"
                        className="nameInput" 
                        onChange={handleNameInputChange} 
                        name="name">
                    </input>
                    <select className="competitionInput" onChange={handleCompetitionInputChange} name="competition">
                        {competitionsData.competitions.map(competition => 
                            <option key={competition.code} data-event-image={competition.emblem} value={competition.code}>
                                {competition.name}
                            </option>)
                        }
                    </select>
                    <span className="pictureContainer">
                        <img className="competitionPicture" id="CompetitionPicture" src={competitionPicture.image}/>
                    </span>
                    {criteriaSelectionData.map(selectionCriteria => 
                        <div>
                            {selectionCriteria.label} - 
                            <NumericInput 
                                      min={1}
                                      value={selectionCriteria.score}
                                      className="awayResInput"
                                      placeholder="Visitante"
                                      onChange={value => updateScore(selectionCriteria.name, value)}
                                      />
                        </div>
                    )}
                    <div className="createButton">        
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </div> 
                </form>
            </div>
        </>    
    )
}

export default CreateTournament;