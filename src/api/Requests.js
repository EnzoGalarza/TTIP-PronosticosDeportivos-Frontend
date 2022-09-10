import axios from "axios";

const getToken = () => ({
    headers: {

    }
})

const getCompetitions = () => {
    return axios.get("http://localhost:8080/competitions", getToken())
}

const getMatches = (compId) => {
    return axios.get(`http://localhost:8080/matches/${compId}`,getToken())
}

const getPronosticos = (user) => {
    return axios.get(`http://localhost:8080/pronosticos/${user}`,getToken())
}

const exportedObject = {
    getCompetitions,
    getMatches,
    getPronosticos
}

export default exportedObject;