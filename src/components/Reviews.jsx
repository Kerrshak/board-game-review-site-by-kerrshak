import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ListOfReviews from './ListOfReviews'
import SortingOptions from './SortingOptions'

function Reviews() {
    const {category} = useParams()

    return (
        <div>
            <SortingOptions  category={category} />
            <ListOfReviews category={category} />
        </div>
    )
}

export default Reviews