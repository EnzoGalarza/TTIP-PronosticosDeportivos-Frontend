import axios from "axios";

const urlBASE = "http://localhost:8080"

const getToken = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
})

export const getCompetitions = () => {
    return axios.get(`${urlBASE}/competitions`, getToken())
}

export const getCurrentMatchDay = (competitionId) => {
    return axios.get(`${urlBASE}/currentMatchDay/${competitionId}`, getToken())
}

export const getMatches = (competitionId, matchDay) => {
    return axios.get(`${urlBASE}/matches/${competitionId}/${matchDay}`,getToken())
}

export const getPredictions = (user,competition) => {
    return axios.get(`${urlBASE}/pronostics/${user}/${competition}`,getToken())
}

export const savePronostics = (predictionList) => {
    return axios.post(`${urlBASE}/pronostics`,predictionList,getToken())
}

export const registerUser = (data) => {
    return axios.post(`${urlBASE}/register`, data)
}

export const login = (data) =>{
    return axios.post(`${urlBASE}/login`,data)
}

export const getUsers = (user) =>{
    return axios.get(`${urlBASE}/users/${user}`,getToken())
}

export const updateTournamentsData = (user) => {
    return axios.get(`${urlBASE}/tournaments/${user}`,getToken())
}

export const saveTournament = (data) =>{
    return axios.post(`${urlBASE}/tournaments`,data, getToken())
}

export const updateScoresInTournament = (id) => {
    return axios.put(`${urlBASE}/tournaments/update/${id}`,null, getToken())
}

export const sendInvitation = (id,data) => {
    return axios.put(`${urlBASE}/tournaments/${id}`,data, getToken())
} 