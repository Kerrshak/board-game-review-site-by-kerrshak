import React, { useEffect, useState } from 'react'
import { getAPI } from '../API'

const SortingOptions = ({category = ""}) => {
    const [categoryList, setCategoryList] = useState([])
    const [sortingType, setSortingType] = useState("created_at")
    const [sortingOrder, setSortingOrder] = useState("desc")
    
    useEffect(() => {
        getAPI('categories').then(({categories})=> {
        setCategoryList(categories)
        }) 
    }, [])

    const categoryElements = categoryList.map(({slug}) => {
        const categoryStr = slug[0].toUpperCase() + slug.slice(1).replace(/-/g, " ")
        const endpoint = `/reviews/category/${slug}`
        
        return <a className='category-links' href={endpoint} key={slug}>{categoryStr}</a>
    })

    const handleSorting = (event) => {
        setSortingType(event.target.value)
    }

    const handleOrder = (event) => {
        setSortingOrder(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if(category) {
            window.location.href = `/reviews/category/${category}?sort_by=${sortingType}&order=${sortingOrder}`
        } else {
            window.location.href = `/reviews?sort_by=${sortingType}&order=${sortingOrder}`
        }
    }

    return (
        <div>
            <nav id='category-element'>
                {categoryElements}
            </nav><br />
            <form onSubmit={handleSubmit}>
                <label className='sorting-dropdowns' htmlFor="sort_by">Sort by:</label>
                <select className='sorting-dropdowns' onChange={handleSorting} name="sort_by" id="sort_by">
                    <option value="created_at">Date</option>
                    <option value="comment_count">Comments</option>
                    <option value="votes">Votes</option>
                </select>
                <label htmlFor="order"></label>
                <select className='sorting-dropdowns' onChange={handleOrder} name="order" id="order">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
                <button className='sorting-dropdowns' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SortingOptions