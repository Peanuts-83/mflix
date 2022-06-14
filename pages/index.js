import { useState, useEffect } from 'react'
import { useRequest } from 'util/useRequest'
import style from 'styles/index.module.scss'
import default_movie from 'assets/default_movie.png'
import Image from 'next/image'
import ImageWithFallback from 'components/ImageWithFallback'
import Comments from 'components/Comments'

export default function Home({ props }) {

    // Ordered movies list
    const [moviesOL, setMoviesOL] = useState([])

    // NUMBER of movies & comments to display
    const [moviesPerPage, setMovisePerPage] = useState(20)
    const [page, setPage] = useState(1)
    const [moviesIDList, setMoviesIDList] = useState([])

    // MIN & MAX Index to display  // use setter if range/length change
    const [movieIndexMin, setMovieIndexMin] = useState(moviesPerPage * (page - 1))
    const [movieIndexMax, setMovieIndexMax] = useState((moviesPerPage * (page - 1)) + moviesPerPage)

    // Originals movies & comments lists
    const { movies } = props
    const { data: comments, error: commentsErr, isLoading: loading } = useRequest(`/api/comments/${moviesIDList}`)

    // SORT status
    const [sorter, setSorter] = useState()

    // FEED list
    useEffect(() => {
        if (movies && movies.length > 0) {
            console.log('MOVIES from index', movies);
            const simpleMovies = movies
            // CLEANUP DATES
            .map(e => {
                console.log(e.year, typeof e.year)
                typeof e.year === 'string' ? e.year = e.year.split('è')[0] : null
                return e
            })
        sortByDate(simpleMovies)
        } else {
            sortByDate([])
        }
    }, [movies])

    // BUILD ordered list visible section
    useEffect(() => {
        if (moviesOL) {
            setMoviesIDList(moviesOL
                .filter((e, i) => i >= movieIndexMin && i < movieIndexMax)
                .map(e => e['_id']))
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
        setSorter('date')
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
        setSorter('rating')
        renderMovies(res)
    }

    function sortByTitle(list = moviesOL) {
        const res = list.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else {
                return 0
            }
        })
        setMoviesOL(res)
        setSorter('title')
        renderMovies(res)
    }

    function renderMovies(list = moviesOL) {
        setMoviesIDList(list.filter((e, i) => i >= movieIndexMin && i < movieIndexMax).map(e => e['_id']))
    }


    //TODO: swap doubles

    return (
        <div className="container">
            <div className={style.sortBy}>
                <div className={style.sortByTitle}>
                    Sort by
                </div>
                <div className={`${style.sortLink} ${sorter === 'date' ? style.selected : ''}`} onClick={() => sortByDate()} > Date </div>

                <div className={`${style.sortLink} ${sorter === 'rating' ? style.selected : ''}`} onClick={() => sortByRating()} > Rating </div>

                <div className={`${style.sortLink} ${sorter === 'title' ? style.selected : ''}`} onClick={() => sortByTitle()} > Title </div>
            </div>

            <ul className={style.ulMain}>
                {moviesOL?.length === 0 && <div>No match on your query!</div> }
                {moviesOL?.map((movie, i) => {
                    if (i >= movieIndexMin && i < movieIndexMax) {
                        return (
                            <li className={style.liMain} key={i}>
                                <div className={style.movie}>
                                    <div className={style.img}>
                                        {movie.poster ? (
                                            <ImageWithFallback
                                                className={style.affiche}
                                                src={movie.poster}
                                                fallback={default_movie}
                                                width={200}
                                                height={250}
                                                layout='responsive'
                                                alt='Affiche'
                                            />
                                        ) : (
                                            <Image
                                                src={default_movie}
                                                layout='responsive'
                                                width={200}
                                                height={250}
                                            />
                                        )}
                                    </div>
                                    <div className={style.title}>

                                        <h1>#{i + 1} <br />{movie.title}</h1>
                                        <h2>{movie.year}</h2>
                                        <div className={style.avgAndDirectors}>
                                            <div className={style.avg}>
                                                Average rating  <strong className={style.avgNum}>{movie.imdb.rating}</strong>
                                            </div>
                                            <div className={style.directors}>
                                                <div>
                                                    Director(s)
                                                </div>
                                                {movie.directors && movie.directors.length > 0 ?
                                                    (movie.directors?.map((d, k) => (
                                                        <div key={k}><strong>{d}</strong></div>
                                                    ))) : (
                                                        <div><em>not provided</em></div>
                                                    )}
                                            </div>
                                        </div>
                                        <div className={style.genres}>
                                            {movie.genres?.map((g, k) => (
                                                <span key={k}> {g} {k < movie.genres.length - 1 && '/'} </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <ul className={style.ulComment}>
                                    {movie && comments && <Comments comments={comments} movie={movie} />}
                                </ul>
                            </li>
                        )
                    }
                })}
            </ul>
        </div >
    )
}
