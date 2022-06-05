import { useState, useEffect } from 'react'
import { useRequest } from 'util/useRequest'

export default function Home({ props }) {
    let { movies } = props
    const [pageComments, setPageComments] = useState()

    // NUMBER of movies & comments to display
    const [moviesPerPage, setMovisePerPage] = useState(30)
    const [page, setPage] = useState(1)
    const [moviesID, setMoviesID] = useState([])

    // MIN & MAX Index to display
    const [movieIDMin, setMovieIdMin] = useState(moviesPerPage * (page - 1))
    const [movieIDMax, setMovieIdMax] = useState((moviesPerPage * (page - 1)) + moviesPerPage)

    // COMMENTS fetch
    const { data: comments, error: commentsErr, isLoading: loading } = useRequest(`/api/comments/${moviesID}`)

    // BUILD moviesID // sorted by date
    useEffect(() => {
        console.log('PROPS -', props)
        if (movies) {
            movies = movies.sort((a, b) => {
                const dateA = a.year.length > 4 ? a.year.split('è')[0] : a.year
                const dateB = b.year.length > 4 ? b.year.split('è')[0] : b.year
                if (dateA > dateB) {
                    return -1
                } else if (dateA < dateB) {
                    return 1
                } else {
                    return 0
                }
            })
            setMoviesID(movies.filter((e, i) => i >= movieIDMin && i < movieIDMax).map(e => e['_id']))
        }
    }, [props])

    useEffect(() => {
        console.log('COMMENTS', comments);
    })

    return (
        <div className="container">
            test <br />

            <ul>
                {movies?.map((movie, i) => {
                    if (i >= movieIDMin && i < movieIDMax) {
                        return (
                            <li key={i}>
                                <div>
                                    {i + 1} - {movie.title} / {movie.year}
                                </div>
                                <ul>
                                    {comments[movie._id]?.map((comment, j) => (
                                        <li key={`${i}-${j}`}>
                                            {comment.text}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )
                    }

                    // // Display movie if at least one comment
                    // return comments[i]?.length > 0 && (
                    //   <li key={i}>
                    //     <div>
                    //       {movie.title} + {movie.rating}
                    //     </div>
                    //     <ul>
                    //       {comments[i]?.map((comment, j) => (
                    //         <li key={`${i}-${j}`}>
                    //           {comment.text}
                    //         </li>
                    //       ))}
                    //     </ul>
                    //   </li>
                    // )
                })}
            </ul>
        </div>
    )
}
