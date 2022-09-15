import axios from "axios";

const urlBASE = "http://localhost:8080"

const getToken = () => ({
    headers: {

    }
})

export const getCompetitions = () => {
    return axios.get(`${urlBASE}/competitions`, getToken())
}

export const getMatches = (compId) => {
    return axios.get(`${urlBASE}/matches/${compId}`,getToken())
}

export const getPredictions = (user) => {
    return axios.get(`${urlBASE}/pronosticos/${user}`,getToken())
}