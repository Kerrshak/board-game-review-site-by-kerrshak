import axios from "axios"

export const getAPI = (endpoint) => {
    console.log("api fetch")    

    return fetch(`https://board-game-reviews-by-kerrshak.herokuapp.com/api/${endpoint}`)
        .then((res) => {
            return res.json()
        })
}