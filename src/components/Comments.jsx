import React, { useContext, useEffect, useState } from 'react'
import { deleteAPI, getAPI } from '../API'
import { UserContext } from '../contexts/User'
import PostComment from './PostComment'

const Comments = ({reviewID}) => {
    const [renderedComments, setRenderedComments] = useState([])
    const {currentUser} = useContext(UserContext)
    
    const handleClick = (event) => {
        const invisElement = document.getElementById(`deleting-${event.target.value}`)
        const buttonElement = document.getElementById(`button-${event.target.value}`)

        invisElement.style.display = "block"
        buttonElement.style.display = "none"

        deleteAPI(event.target.value)
            .then(() => {
                const commentElement = document.getElementById(`comment-${event.target.value}`)
                
                commentElement.style.display = "none"
            })
            .catch(() => {
                const failureElement = document.getElementById(`failure-${event.target.value}`)

                failureElement.style.display = "block"
                invisElement.style.display = "none"
                buttonElement.style.display = "block"
            })
    }

    const renderCommentsArr = (comments) => {
        const commentsArr = comments.map((comment) => {
            if(currentUser === comment.author) {
                return <li key={comment.comment_id} id={`comment-${comment.comment_id}`} className='comment-items'>
                <p>{comment.body}</p>
                <p>Written by: {comment.author} at: {comment.created_at.replace("T", " ").slice(0, 16)}</p>
                <p>Votes: {comment.votes}</p>
                <button id={`button-${comment.comment_id}`} onClick={handleClick} value={comment.comment_id}>Delete</button>
                <p id={`deleting-${comment.comment_id}`} className="deleting">Deleting...</p>
                <p id={`failure-${comment.comment_id}`} className="failure">Unable to delete at this time, please try again later</p>
            </li>
            } else return <li key={comment.comment_id} className='comment-items'>
                <p>{comment.body}</p>
                <p>Written by: {comment.author} at: {comment.created_at.replace("T", " ").slice(0, 16)}</p>
                <p>Votes: {comment.votes}</p>
            </li>
        })
        setRenderedComments(commentsArr)
    }

    useEffect(() => {
        getAPI(`reviews/${reviewID}/comments`)
        .then(({comments}) => {
            renderCommentsArr(comments)
        })
        
        if(currentUser === "") {
            const postCommentElement = document.getElementById("post-comment-element")
            const loginCommentElement = document.getElementById("login-comment-element")
    
            postCommentElement.style.display = "none"
            loginCommentElement.style.display = "block"
        }
    }, [setRenderedComments])


    return (
        <div>
            <ul>
                {renderedComments}
            </ul>
            <div id='post-comment-element'>
                <PostComment renderedComments={renderedComments} setRenderedComments={setRenderedComments} reviewID={reviewID}/>
            </div>
            <div id="login-comment-element" style={{display : "none"}}>
                <p>You have to be logged in to post comments</p>
                <a href="/users">User login</a>
            </div>
        </div>
    )
}

export default Comments