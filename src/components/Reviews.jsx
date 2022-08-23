import { useParams } from 'react-router-dom'
import ListOfReviews from './ListOfReviews'
import SortingOptions from './SortingOptions'

function Reviews() {
    const {category} = useParams()

    return (
        <div>
            <SortingOptions  />
            <ListOfReviews category={category} />
        </div>
    )
}

export default Reviews