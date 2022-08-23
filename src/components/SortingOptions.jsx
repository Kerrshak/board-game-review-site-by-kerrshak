import React, { useEffect, useState } from 'react'
import { getAPI } from '../API'

const SortingOptions = ({category = ""}) => {
    const [categoryList, setCategoryList] = useState([])
    console.log("this is the category", category)
    
    useEffect(() => {
        getAPI('categories').then(({categories})=> {
        setCategoryList(categories)
        }) 
    }, [])

    const handleChange = (event) => {
        window.location.assign(`http://localhost:3000/reviews/${event.target.value}`)
    }

    const categoryElements = categoryList.map(({slug}) => {
        const categoryStr = slug[0].toUpperCase() + slug.slice(1).replace(/-/g, " ")

        return <option key={slug} value={`category/${slug}`} >{categoryStr}</option>
    })

    const defaultValue = (category === "") ? "" : `category/${category}`

    return (
        <div>
            <label htmlFor="category">Category: </label>
                <select onChange={handleChange} name="category" value={defaultValue}>
                    <option key="null" value="">All categories</option>
                    {categoryElements}
                </select>
        </div>
    )
}

export default SortingOptions