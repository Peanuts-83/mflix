import { useState, useEffect } from 'react'
import { useRequest } from 'util/useRequest'

export default function Home({ props }) {

    // Ordered movies list
    const [moviesOL, setMoviesOL] = useState([])

    // NUMBER of movies & comments to display
    const [moviesPerPage, setMovisePerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [moviesIDList, setMoviesIDList] = useState([])

    // MIN & MAX Index to display  // use setter if range/length change
    const [movieIndexMin, setMovieIndexMin] = useState(moviesPerPage * (page - 1))
    const [movieIndexMax, setMovieIndexMax] = useState((moviesPerPage * (page - 1)) + moviesPerPage)

    // Originals movies & comments lists
    const { movies } = props
    const { data: comments, error: commentsErr, isLoading: loading } = useRequest(`/api/comments/${moviesIDList}`)

    // FEED list
    useEffect(() => {
        setMoviesOL(movies)
    }, [movies])

    // BUILD ordered list
    useEffect(() => {
        if (moviesOL) {
            setMoviesIDList(moviesOL.filter((e, i) => i >= movieIndexMin && i < movieIndexMax).map(e => e['_id']))
        }
    }, [moviesOL])

    function sortByDate(list = moviesOL) {
            const res = list.sort((a, b) => {
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
            // console.log('MOVIES from sort by date', res[0])
            setMoviesOL(res)
            renderMovies(res)
        }

    function sortByRating(list = moviesOL) {
            const res = list.sort((a, b) => {
                if (a.imdb.rating > b.imdb.rating) {
                    return -1
                } else if (a.imdb.rating < b.imdb.rating) {
                    return 1
                } else {
                    return 0
                }
            })
            // console.log('MOVIES from sort by rating', res[0])
            setMoviesOL(res)
            renderMovies(res)
    }

    function renderMovies(list = moviesOL) {
        setMoviesIDList(list.filter((e, i) => i >= movieIndexMin && i < movieIndexMax).map(e => e['_id']))
    }


    return (
        <div className="container">
            <div>
                Sort by :
                <div onClick={() => sortByDate()}> Date </div>

                <div onClick={() => sortByRating()}> Rating </div>
            </div>

            <ul>
                {moviesOL?.map((movie, i) => {
                    if (i >= movieIndexMin && i < movieIndexMax) {
                        return (
                            <li key={i}>
                                <div>
                                    {i + 1} - {movie.title} / {movie.year}
                                </div>
                                <div>
                                    Average rating : {movie.imdb.rating} - Director(s) : {movie.directors?.map((d, k) => (
                                        <span key={k}>{d}</span>
                                    ))}
                                </div>
                                <div>
                                    GENRE :
                                    {movie.genres.map((g, k) => (
                                        <span key={k}> {g} {k < movie.genres.length - 1 && '/'} </span>
                                    ))}
                                </div>
                                <ul>
                                    {comments ?
                                        comments[movie._id] && comments[movie._id].length > 0 ?
                                            comments[movie._id]?.map((comment, k) => (
                                                <li key={k}>
                                                    {comment.text} -
                                                    <a
                                                        href="#"
                                                        title={`See all comments of this user`}>
                                                        <em> {comment.name} </em>
                                                    </a>
                                                </li>
                                            ))
                                            : (
                                                <li>NO COMMENTS</li>
                                            ) : (
                                            <li>NO COMMENT</li>
                                        )}
                                </ul>
                            </li>
                        )
                    }
                })}
            </ul>
        </div >
    )
}
