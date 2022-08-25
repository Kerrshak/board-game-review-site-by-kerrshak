import React, { useContext, useState } from 'react'
import { getAPI, postAPI } from '../API'
import { UserContext } from '../contexts/User'

const PostComment = ({renderedComments, setRenderedComments, reviewID}) => {
    const {currentUser} = useContext(UserContext)
    const [newComment, setNewComment] = useState("")

    const handleChange = (event) => {
        setNewComment(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault()
        
        setRenderedComments([...renderedComments, <li>
            <p>Posting comment</p>
        </li>])

        postAPI(reviewID, newComment, currentUser)
        .then(() => {
            getAPI(`reviews/${reviewID}/comments`)
            .then(({comments}) => {
                const commentsArr = comments.map((comment) => {
    
                    return <li key={comment.comment_id} className='comment-items'>
                        <p>{comment.body}</p>
                        <p>Written by: {comment.author} at: {comment.created_at.replace("T", " ").slice(0, 16)}</p>
                        <p>Votes: {comment.votes}</p>
                        <br />
                    </li>
                })
                setNewComment("")
                setRenderedComments(commentsArr)
            })
        })
        .catch(() => {
            getAPI(`reviews/${reviewID}/comments`)
            .then(({comments}) => {
                const commentsArr = comments.map((comment) => {
    
                    return <li key={comment.comment_id} className='comment-items'>
                        <p>{comment.body}</p>
                        <p>Written by: {comment.author} at: {comment.created_at.replace("T", " ").slice(0, 16)}</p>
                        <p>Votes: {comment.votes}</p>
                        <br />
                    </li>
                })
                commentsArr.push(<li key="failed-comment" className='comment-items'>
                    <p>We were unable to add your comment at this time, sorry. Please try again later.</p>
                </li>)

                setRenderedComments(commentsArr)
            })
        })
    }

    return (
        <form>
            <input id="comment-box" onChange={handleChange} type="text" value={newComment}/><br />
            <input id="comment-button" onClick={handleClick} type="submit" value="Post comment"/>
        </form>
    )
}

export default PostComment