import axios from "axios";

const getToken = () => ({
    headers: {

    }
})

const getCompetitions = () => {
    return axios.get("http://localhost:8080/competitions", getToken())
}

const exportedObject = {
    getCompetitions
}

export default exportedObject;