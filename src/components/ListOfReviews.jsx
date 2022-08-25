import React, { useEffect, useState } from 'react'
import { getAPI } from '../API'
import { Link, useSearchParams } from "react-router-dom"

function ListOfReviews({category=""}) {
    const [reviewList, setReviewList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        let sortBy = searchParams.get("sort_by")
        let order = searchParams.get("order")
        let getCategory = ""

        if (category !== "") {
            getCategory = `category=${category}`
        }

        if (sortBy === null) {
            sortBy = ""
        } else {
            sortBy = `sort_by=${sortBy}`
        }

        if (order === null) {
            order = ""
        } else {
            order = `order=${order}`
        }

        getAPI(`reviews/?${category}&${sortBy}&${order}`)
        .then(({reviews}) => {
            setReviewList(reviews)
        })
    }, [category])

    const reviewElements = reviewList.map((review) => {
        const endpoint = `/reviews/${review.review_id}`

        return <li key={review.review_id} className='review-items'>
            <h2><Link to={endpoint}>{review.title}</Link></h2>
            <img className='review-img' src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" alt={review.title} />
            <p className='review-body'>{review.review_body}</p>
            <p>Written by: {review.owner} on {review.created_at.replace("T", " ").slice(0, 16)} &nbsp;&nbsp;&nbsp; Game by: {review.designer}</p>
            <p>Votes: {review.votes} <Link to={endpoint}>Comments:</Link> {review.comment_count}</p>
        </li>
    })

    return (
        <div>
            <ul id='review-list'>
                {reviewElements}
            </ul>
        </div>
    )
}

export default ListOfReviews