import React, { useState } from 'react'
import ListOfReviews from './ListOfReviews'
import SortingOptions from './SortingOptions'

const Reviews = () => {

    const [categoryFilter, setCategoryFilter] = useState([])

    return (
        <div>
            <SortingOptions setCategoryFilter={setCategoryFilter} />
            <ListOfReviews categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
        </div>
    )
}

export default Reviews