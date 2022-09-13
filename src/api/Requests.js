import axios from "axios";

const getToken = () => ({
    headers: {

    }
})

export const getCompetitions = () => {
    return axios.get("http://localhost:8080/competitions", getToken())
}

export const getMatches = (compId) => {
    return axios.get(`http://localhost:8080/matches/${compId}`,getToken())
}

export const getPredictions = (user) => {
    return axios.get(`http://localhost:8080/pronosticos/${user}`,getToken())
}