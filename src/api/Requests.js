import axios from "axios";

const getToken = () => ({
    headers: {

    }
})

const getCompetitions = () => {
    return axios.get("http://localhost:8080/competitions", getToken())
}

export default {getCompetitions}