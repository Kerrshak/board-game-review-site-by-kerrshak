import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAPI, patchAPI } from '../API'
import Comments from './Comments'

const SingleReview = () => {
    const {reviewID} = useParams()
    const [renderedReview, setRenderedReview] = useState({})

    useEffect(() => {
        getAPI(`reviews/${reviewID}`)
        .then(({review}) => {
            review.created_at = review.created_at.replace("T", " ").slice(0, 16)
            setRenderedReview(review)
        })
    }, [setRenderedReview])

    const handleClick = (event) => {
        const voteValue = Number(event.target.value)

        patchAPI(reviewID, voteValue)
        .catch(() => {
            const errReview = {...renderedReview, votes: "Error, could not update votes"}
            setRenderedReview(errReview)
        })

        const newVotes = renderedReview.votes + voteValue
        const updatedReview = {...renderedReview, votes: newVotes}

        setRenderedReview(updatedReview)
    }
  
    return (
        <div>
            <h2>{renderedReview.title}</h2>
            <img className='review-img' src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" alt={renderedReview.title} />
            <p>Category: {renderedReview.category}</p>
            <p className='review-body'>{renderedReview.review_body}</p>
            <p>Written by: {renderedReview.owner} on {renderedReview.created_at} &nbsp;&nbsp;&nbsp; Game by: {renderedReview.designer}</p>
            <p>Votes: {renderedReview.votes} <button value={1} onClick={handleClick}>Upvote</button> <button value={-1} onClick={handleClick}>Downvote</button></p>
            <p>Comments: </p>
            <Comments reviewID={reviewID}/>
        </div>
    )
}

export default SingleReview