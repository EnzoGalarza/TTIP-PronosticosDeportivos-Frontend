import React, {useState, useEffect} from 'react'
import { getCompetitions, saveTournament } from "../../api/Requests"
import { useNavigate } from "react-router-dom";
import "../../styles/CreateTournament.css";
import Navbar from "../Navbar";
import Select from "react-select";
import NumericInput from 'react-numeric-input'


const CreateTournament = () => {

    const criteriaOptions = [
        {value: "Complete",    label: "Resultado completo"},
        {value: "Partial",     label: "Resultado parcial"},
        {value: "Approach",    label: "Acercamiento"},
        {value: "WinnerOrTie", label: "Ganador"},
    ];

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
                () => {
                    navigate("/home")
                }
            )
            .catch((error) => {
                console.log('Error de creación de torneo: ', error.response.data)
            }) 
    }

    const updateScore = (criteriaName, goals) =>{
        setCriteriaSelectionData(current => current.map(criteria =>{
            if(criteria.name === criteriaName){
                return {...criteria, score: goals}
            }
            return criteria
        }))
        setTournamentData({
            ...tournamentData,
            criteria : tournamentData.criteria.map(criteria =>{
                if(criteria.name === criteriaName){
                    return {...criteria, score: goals}
                }
                return criteria
            })
        })
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
        event.map(option => 
            newOptions.push({
                label: option.label, 
                name: option.value, 
                score: getCriteriaScore(option.value)
            })
        )
        setCriteriaSelectionData(newOptions)
        setTournamentData({
            ...tournamentData,
            criteria : updateTournamentCriteria(newOptions)
        })
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
        setTournamentData({
            ...tournamentData,
            competition : event.target.value
        })
    }

    const updateTournamentCriteria = (options) =>{
        var tournamentCriteria = []
        options.map((option =>
            tournamentCriteria.push({name: option.name, score: option.score})
        ))
        return tournamentCriteria
    }


    const handleCreate = (event) =>{
        createTournament()
    }

    useEffect(() => {
        
        updateCompetitions();
        setTournamentData({
            ...tournamentData,
            criteria : updateTournamentCriteria(criteriaSelectionData)
        })
        // eslint-disable-next-line
    },[]); 

    return(
       <> 
            <header>
                <Navbar />
            </header>
            <div className="tournaments-form">
                <div data-testid="tournament-title" className="tournamentTitle">
                    Nuevo torneo
                </div>
                <div  className="inputName">        
                    <input 
                        data-testid="tournament-name"
                        type="text" 
                        placeholder="Nombre" 
                        id="nameInput"
                        className="nameInput" 
                        onChange={handleNameInputChange} 
                        name="name">
                    </input>
                </div>
                <div className="competitionName">    
                    <select data-testid="competition" className="competitionInput" onChange={handleCompetitionInputChange} name="competition">
                        {competitionsData.competitions.map(competition => 
                            <option data-testid="competition-option" key={competition.code} data-event-image={competition.emblem} value={competition.code}>
                                {competition.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className="pictureContainer">
                    <img alt="competition" className="competitionPicture" id="CompetitionPicture" src={competitionPicture.image}/>
                </div>
                <div data-testid="criteria-selection" className="select-criteria">
                    <Select
                            aria-label='Criterios'
                            data-testid="criteria-selection"
                            className="criteriaSelection"
                            classNamePrefix="select"
                            placeholder="Criterios de puntuación"
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
                </div>
                {criteriaSelectionData.length > 0 &&
                <div data-testid="criterio-tournament" className='criteriaItemTitle'>
                    <span>Criterio</span> <span>Puntaje</span>
                </div>}
                {criteriaSelectionData.map(selectionCriteria => 
                    <div className="criteriaItem">
                        {selectionCriteria.label}
                        <NumericInput 
                                  min={1}
                                  value={selectionCriteria.score}
                                  className="scoreInput"
                                  onChange={value => updateScore(selectionCriteria.name, value)}
                                  />
                    </div>
                )} 
                <div className="createButton">        
                    <button onClick={() => handleCreate()} type="submit" className="btn btn-primary create">Crear</button>
                </div>
            </div> 
        </>    
    )
}

export default CreateTournament;