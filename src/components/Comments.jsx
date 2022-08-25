import React, { useEffect, useState } from 'react'
import { getAPI } from '../API'

const Comments = ({reviewID}) => {
    const [renderedComments, setRenderedComments] = useState([])
    
    useEffect(() => {
        getAPI(`reviews/${reviewID}/comments`)
        .then(({comments}) => {
            const commentsArr = comments.map((comment) => {


                return <li className='comment-items'>
                    <p>{comment.body}</p>
                    <p>Written by: {comment.author} at: {comment.created_at.replace("T", " ").slice(0, 16)}</p>
                    <p>Votes: {comment.votes}</p>
                    <br />
                </li>
            })
            setRenderedComments(commentsArr)
        })
    }, [setRenderedComments])
    
    

    return (
        <div>
            <ul>
                {renderedComments}
            </ul>
        </div>
    )
}

export default Comments