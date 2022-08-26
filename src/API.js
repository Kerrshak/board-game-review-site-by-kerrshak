import axios from "axios"

export const getAPI = (endpoint) => {
    return fetch(`https://board-game-reviews-by-kerrshak.herokuapp.com/api/${endpoint}`)
        .then((res) => {
            if(res.status === 404){
                throw new Error()
            }
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

export const postAPI = (reviewID, comment, username) => {
    const endpoint = `https://board-game-reviews-by-kerrshak.herokuapp.com/api/reviews/${reviewID}/comments`
    const commentObj = {username: username, body: comment}

    return axios.post(endpoint, commentObj)
        .catch(() => {
            throw new Error()
        })
}

export const deleteAPI = (commentID) => {
    const endpoint = `https://board-game-reviews-by-kerrshak.herokuapp.com/api/comments/${commentID}`

    return axios.delete(endpoint)
        .catch((err) => {
            console.log("caught", err)
            throw new Error()
        })
}