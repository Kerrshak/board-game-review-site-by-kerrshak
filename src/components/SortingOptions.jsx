import React, { useEffect, useState } from 'react'
import { getAPI } from '../API'

const SortingOptions = () => {
    const [categoryList, setCategoryList] = useState([])
    
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

    return (
        <div>
            <nav id='category-element'>
                {categoryElements}
            </nav>
        </div>
    )
}

export default SortingOptions