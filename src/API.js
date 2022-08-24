import axios from "axios"

export const getAPI = (endpoint) => {
    return fetch(`https://board-game-reviews-by-kerrshak.herokuapp.com/api/${endpoint}`)
        .then((res) => {
            return res.json()
        })
}

export const patchAPI = (reviewID, vote) => {
    const endpoint = `https://board-game-reviews-by-kerrshak.herokuapp.com/api/reviews/${reviewID}`
    const voteObj = {inc_votes : vote}

    return axios.patch(endpoint, voteObj)
        .then(({data}) => {
            return data
        })
        .catch(() => {
            throw new Error()
        })
}