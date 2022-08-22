import React, { useEffect, useState } from 'react'
import { getAPI } from '../API'
import { Link } from "react-router-dom"

const ListOfReviews = ({categoryFilter, setCategoryFilter}) => {
    
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
        getAPI(`reviews/?category=${categoryFilter}`)
        .then(({reviews}) => {
            console.log(reviews)
            setReviewList(reviews)
        })
    }, [categoryFilter])

    return (
    <div>
        <ul id='review-list'>
            {reviewList.map((review) => {
                const endpoint = `/reviews/${review.review_id}/comments`

                return <li key={review.review_id} className='review-items'>
                    <h2>{review.title}</h2>
                    <img className='review-img' src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" alt={review.title} />
                    <p className='review-body'>{review.review_body}</p>
                    <p>Written by: {review.owner} on {review.created_at.replace("T", " ").slice(0, 16)} &nbsp;&nbsp;&nbsp; Game by: {review.designer}</p>
                    <p>Votes: {review.votes} <Link to={endpoint}>Comments: </Link>{review.comment_count}</p>
                </li>
            })}
        </ul>
    </div>
  )
}

export default ListOfReviews