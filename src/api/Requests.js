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
    return axios.get(`${urlBASE}/pronostics/${user}`,getToken())
}

export const savePronostics = (predictionList) => {
    return axios.post(`${urlBASE}/pronostics`,predictionList)
}

/*export const updatePronostics = (predictionList) => {
    return axios.put(`${urlBASE}/pronostics/update`,predictionList)
}*/