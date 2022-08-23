import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAPI } from '../API'

const SingleReview = () => {
    const {reviewID} = useParams()
    const [review, setReview] = useState({})
    
    console.log('single review component is running')

    useEffect(() => {
        console.log("useEffect is running")
        getAPI(`reviews/${reviewID}`)
        .then(({review}) => {
            review.created_at = review.created_at.replace("T", " ").slice(0, 16)
            setReview(review)
        })
    }, [])


  
    return (
        <div>
            <h2>{review.title}</h2>
            <img className='review-img' src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" alt={review.title} />
            <p>Category: {review.category}</p>
            <p className='review-body'>{review.review_body}</p>
            { <p>Written by: {review.owner} on {review.created_at} &nbsp;&nbsp;&nbsp; Game by: {review.designer}</p> }
            <p>Votes: {review.votes} &nbsp;&nbsp;&nbsp; Comments: {review.comment_count}</p>
        </div>
  )
}

export default SingleReview