import React, { useContext, useState } from 'react'
import { deleteAPI, getAPI, postAPI } from '../API'
import { UserContext } from '../contexts/User'

const PostComment = ({renderedComments, setRenderedComments, reviewID}) => {
    const {currentUser} = useContext(UserContext)
    const [newComment, setNewComment] = useState("")
    const emptyComment = document.getElementById("empty-comment")

    const handleChange = (event) => {
        setNewComment(event.target.value)
        emptyComment.style.display = "none"
    }

    const handleDelete = (event) => {
        const invisElement = document.getElementById(`deleting-${event.target.value}`)
        const buttonElement = document.getElementById(`button-${event.target.value}`)

        invisElement.style.display = "block"
        buttonElement.style.display = "none"

        deleteAPI(event.target.value)
            .then(() => {
                const commentElement = document.getElementById(`comment-${event.target.value}`)
                
                commentElement.style.display = "none"
            })
            .catch((err) => {
                const failureElement = document.getElementById(`failure-${event.target.value}`)
                console.log("error occured", err)

                failureElement.style.display = "block"
                invisElement.style.display = "none"
                buttonElement.style.display = "block"
            })
    }

    const handleClick = (event) => {
        event.preventDefault()
        
        if(newComment.length === 0){
            emptyComment.style.display = "block"
            return
        }
        setRenderedComments([...renderedComments, <li>
            <p>Posting comment</p>
        </li>])

        postAPI(reviewID, newComment, currentUser)
        .then(() => {
            getAPI(`reviews/${reviewID}/comments`)
            .then(({comments}) => {
                const commentsArr = comments.map((comment) => {
                    if(currentUser === comment.author) {
                        return <li key={comment.comment_id} id={`comment-${comment.comment_id}`} className='comment-items'>
                            <p>{comment.body}</p>
                            <p>Written by: {comment.author} at: {comment.created_at.replace("T", " ").slice(0, 16)}</p>
                            <p>Votes: {comment.votes}</p>
                            <button id={`button-${comment.comment_id}`} onClick={handleDelete} value={comment.comment_id}>Delete</button>
                            <p id={`deleting-${comment.comment_id}`} className="deleting">Deleting...</p>
                            <p id={`failure-${comment.comment_id}`} className="failure">Unable to delete at this time, please try again later</p>
                        </li>
                    } else {
                        return <li key={comment.comment_id} id={`comment-${comment.comment_id}`} className='comment-items'>
                        <p>{comment.body}</p>
                        <p>Written by: {comment.author} at: {comment.created_at.replace("T", " ").slice(0, 16)}</p>
                        <p>Votes: {comment.votes}</p>
                    </li>
                    }
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
                        <button id={`button-${comment.comment_id}`} onClick={handleDelete} value={comment.comment_id}>Delete</button>
                        <p id={`deleting-${comment.comment_id}`} className="deleting">Deleting...</p>
                        <p id={`failure-${comment.comment_id}`} className="failure">Unable to delete at this time, please try again later</p>
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
            <p id='empty-comment' style={{display : "none"}}>You haven't typed a comment</p>
        </form>
    )
}

export default PostComment