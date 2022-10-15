import React, {useState, useEffect} from 'react'
import { getCompetitions, getUsers, saveTournament } from "../api/Requests"
import { useNavigate } from "react-router-dom";
import "../styles/CreateTournament.css";
import Navbar from "./Navbar";

const CreateTournament = () => {

    const [datos, setDatos] = useState({
        name: '',
        competition: '',
        usersEmail: [localStorage.getItem("user")]
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
            setCompetitionPicture({
                image: response.data[0].emblem
            })
        })
        .catch((error) => {console.log(error)})
    }

    const createTournament = () => {
        saveTournament(datos)
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

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
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
                    <span className="pictureContainer">
                        <img className="competitionPicture" id="CompetitionPicture" src={competitionPicture.image}/>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Nombre" 
                        id="nameInput"
                        className="nameInput" 
                        onChange={handleInputChange} 
                        name="name">
                    </input>
                    <select className="competitionInput" onChange={handleInputChange} name="competition">
                        {competitionsData.competitions.map(competition => 
                            <option key={competition.code} data-event-image={competition.emblem} value={competition.code}>
                                {competition.name}
                            </option>)
                        }
                    </select>
                    <div className="createButton">        
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </div> 
                </form>
            </div>
        </>    
    )
}

export default CreateTournament;