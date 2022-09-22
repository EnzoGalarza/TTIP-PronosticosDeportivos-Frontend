import axios from "axios";

const urlBASE = "http://localhost:8080"

const getToken = () => ({
    headers: {

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

export const getPredictions = (user) => {
    return axios.get(`${urlBASE}/pronostics/${user}`,getToken())
}

export const savePronostics = (predictionList) => {
    return axios.post(`${urlBASE}/pronostics`,predictionList)
}