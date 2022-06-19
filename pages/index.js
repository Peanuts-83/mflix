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
    const [moviesPerPage, setMoviesPerPage] = useState(20)
    const [pagesNumber, setPagesNumber] = useState()
    const [page, setPage] = useState(1)
    const [pageArray, setPageArray] = useState([])
    const [moviesIDList, setMoviesIDList] = useState([])

    // MIN & MAX Index to display  // use setter if range/length change
    const [movieIndexMin, setMovieIndexMin] = useState(moviesPerPage * (page - 1))
    const [movieIndexMax, setMovieIndexMax] = useState((moviesPerPage * (page - 1)) + moviesPerPage)

    // Originals movies & comments lists
    const { movies } = props
    const { data: comments, error: commentsErr, isLoading: loading } = useRequest(`/api/comments/${moviesIDList}`)

    // SORT status
    const [sorter, setSorter] = useState()
    const [sortAsc, setSortAsc] = useState(true)

    // FEED list
    useEffect(() => {
        if (movies && movies.length > 0) {
            console.log('MOVIES from index', movies);
            const simpleMovies = movies
                // CLEANUP DATES
                .map(e => {
                    // console.log(e.year, typeof e.year)
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
            setPagesNumber(Math.ceil(moviesOL.length / moviesPerPage))
        }
        setMovieIndexMin(moviesPerPage * (page - 1))
        setMovieIndexMax((moviesPerPage * (page - 1)) + moviesPerPage)
    }, [moviesOL, moviesPerPage, page])

    useEffect(() => {
        if (pagesNumber) {
            console.log('Page Array', pagesNumber, Array.from(Array(pagesNumber).keys()).map(x => ++x));
            setPageArray(Array.from(Array(pagesNumber).keys())
                .map(x => ++x)
                .filter(x => x >= page - 2 && x <= page + 2 && x <= pagesNumber)
            )

        }
    }, [pagesNumber, page])

    function sortByDate(list = moviesOL) {
        const res = list.sort((a, b) => {
            const dateA = a.year.length > 4 ? a.year.split('è')[0] : a.year
            const dateB = b.year.length > 4 ? b.year.split('è')[0] : b.year
            if (dateA > dateB) {
                return sortAsc ? 1 : -1
            } else if (dateA < dateB) {
                return sortAsc ? -1 : 1
            } else {
                return 0
            }
        })
        setSortAsc(!sortAsc)
        setMoviesOL(res)
        setSorter('date')
        renderMovies(res)
    }

    function sortByRating(list = moviesOL) {
        const res = list.sort((a, b) => {
            if (a.imdb.rating > b.imdb.rating) {
                return sortAsc ? 1 : -1
            } else if (a.imdb.rating < b.imdb.rating) {
                return sortAsc ? -1 : 1
            } else {
                return 0
            }
        })
        setSortAsc(!sortAsc)
        setMoviesOL(res)
        setSorter('rating')
        renderMovies(res)
    }

    function sortByTitle(list = moviesOL) {
        const res = list.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return sortAsc ? 1 : -1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return sortAsc ? -1 : 1
            } else {
                return 0
            }
        })
        setSortAsc(!sortAsc)
        setMoviesOL(res)
        setSorter('title')
        renderMovies(res)
    }

    function renderMovies(list = moviesOL) {
        setMoviesIDList(list.filter((e, i) => i >= movieIndexMin && i < movieIndexMax).map(e => e['_id']))
    }

    function changePageArray(way) {
        way === 'previous' ?
            setPage(page - 1)
            :
            setPage(page + 1)
    }

    return (
        <div className="container">
            <div className={style.submenu}>
                {moviesOL?.length === 0 ? <div>No match on your query!</div> : <div>{moviesOL.length} matchs for {pagesNumber} page(s)</div>}
                <div className={style.sort}>
                    <div className={style.sortBy}>
                        <div className={style.sortByTitle}>
                            Sort by
                        </div>
                        <div className={`${style.sortLink} ${sorter === 'date' ? style.selected : ''}`} onClick={() => sortByDate()} title='sortByDate'> Date </div>

                        <div className={`${style.sortLink} ${sorter === 'rating' ? style.selected : ''}`} onClick={() => sortByRating()} title='sortByRating' > Rating </div>

                        <div className={`${style.sortLink} ${sorter === 'title' ? style.selected : ''}`} onClick={() => sortByTitle()} title='sortByTitle' > Title </div>
                        <div className={style.sortByTitle}></div>
                    </div>
                    <select className={style.selectResNum} name="resultsPerPage" id="resultsNumber" onChange={e => setMoviesPerPage(+e.target.value)}>
                        <option value="20">20 results per page</option>
                        <option value="50">50 results per page</option>
                        <option value="100">100 results per page</option>
                    </select>
                </div>
                <div className={style.num}>
                    {page !== 1 && <span className={`${style.next} ${style.active}`} onClick={() => changePageArray('previous')} title='next'>Previous...</span>}
                    {pageArray.map((x, i) => {
                        return x === page ?
                            x === pagesNumber ?
                                <span key={i}> {x} </span>
                                :
                                <span key={i}> {x} <span>/</span></span>
                            :
                            <span key={i} className={`${style.next} ${style.active}`} onClick={() => setPage(x)}> {x} <span>/</span></span>
                    })}
                    {page < pagesNumber && <span className={`${style.next} ${style.active}`} onClick={() => changePageArray('next')} title='next'>...next</span>}
                </div>
            </div>

            <ul className={style.ulMain}>
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
                                                    (movie.directors?.map((d, k) => {
                                                        if (k < 5) {
                                                            return (
                                                                <div key={k}><strong>{d}</strong></div>
                                                            )
                                                        } else {
                                                            return <span>...</span>
                                                        }
                                                    })) : (
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
                                <div className={style.plot}>{movie.plot}</div>
                                <ul className={style.ulComment}>
                                    {movie && comments && <Comments comments={comments} movie={movie} />}
                                </ul>
                            </li>
                        )
                    }
                })}
            </ul>
            <div className={style.num}>
                {page !== 1 && <span className={`${style.next} ${style.active}`} onClick={() => changePageArray('previous')} title='next'>Previous...</span>}
                {pageArray.map((x, i) => {
                    return x === page ?
                        x === pagesNumber ?
                            <span key={i}> {x} </span>
                            :
                            <span key={i}> {x} <span>/</span></span>
                        :
                        <span key={i} className={`${style.next} ${style.active}`} onClick={() => setPage(x)}> {x} <span>/</span></span>
                })}
                {page < pagesNumber && <span className={`${style.next} ${style.active}`} onClick={() => changePageArray('next')} title='next'>...next</span>}
            </div>
        </div >
    )
}
