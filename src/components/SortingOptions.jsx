import React, { useEffect, useState } from 'react'
import { getAPI } from '../API'

const SortingOptions = ({setCategoryFilter}) => {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        getAPI('categories').then(({categories})=> {
        setCategoryList(categories)
    }) 
    }, [])

    const handleChange = (event) => {
        console.log(event.target.value)
        setCategoryFilter(event.target.value)
    }

    return (
        <div>
            <label htmlFor="category">Category: </label>
                <select onChange={handleChange} name="category" >
                    <option key="null" value="">All categories</option>
                    {categoryList.map(({slug}) => {
                        const categoryStr = slug[0].toUpperCase() + slug.slice(1).replace(/-/g, " ")

                        return <option key={slug} value={slug}>{categoryStr}</option>
                    })}
                </select>
        </div>
    )
}

export default SortingOptions