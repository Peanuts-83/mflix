import React, { useState, useEffect } from 'react'
import axios from "axios"
import RatingBar from "./RatingBar"
import { useRequest } from 'util/useRequest'


export default function SearchForm({ setMovies, setComments, setLoading }) {
    // Genres available for SELECT
    const { data: genres, genresErr } = useRequest('/api/genres')

    // REQUEST BUILD
    const [request, setRequest] = useState('')

    // REQUEST DEMO
    const [requestBuild, setRequestBuild] = useState('')
    const [showReq, setShowReq] = useState(false)


    // const [sendRequest, setSendRequest] = useState(false)
    const { data: movies, error: moviesErr, isLoading: moviesLoad } = useRequest(`/api/movies/${request}`)

    useEffect(() => {
        switch (moviesLoad) {
            case true:
                // console.log('LOADING')
                setLoading(true)
                break
            default:
                setLoading(false)
        }
    }, [moviesLoad])

    // FORM requested values
    const [reqTitle, setReqTitle] = useState('')
    const [reqGenre, setReqGenre] = useState('')
    const [reqDirector, setReqDirector] = useState('')
    const [reqRating, setReqRating] = useState([])

    // const [ratingRange, setRatingRange] = useState([])

    // RESPONSE values
    // const [movieIds, setMovieIds] = useState([])
    // const [directors, setDirectors] = useState([])
    // const [ratings, setRatings] = useState([])


    // useEffect(() => console.log('GENRES from search', genres, genresErr), [genres])

    useEffect(() => {
        // console.table('MOVIES from search', movies, moviesErr)
        setMovies(movies)
    }, [movies])


    // BUILD REQUEST
    useEffect(() => {
        const ratingRange = []
        for (let i = reqRating[0]; i <= reqRating[1]; i++) {
            ratingRange.push(i)
        }
        setRequestBuild(`title=${reqTitle.toLowerCase()}&genres=${reqGenre}&director=${reqDirector.toLowerCase()}&rating=${ratingRange}`)
    }, [reqTitle, reqDirector, reqGenre, reqRating])

    // useEffect(() => {
    //     buildRatingRange()
    // }, [reqRating])

    // function buildRatingRange() {
    //     if (reqRating) {
    //         console.log('REQRATING', reqRating)
    //         for (let i = reqRating[0]; i <= reqRating[1]; i++) {
    //                 ratingRange.push(i)
    //             }
    //     }
    // }


    // GET comments
    async function getComments(e) {
        e.preventDefault()
        const ratingRange = []
        for (let i = reqRating[0]; i <= reqRating[1]; i++) {
            ratingRange.push(i)
        }
        setRequest(encodeURIComponent(`title=${reqTitle.toLowerCase()}&genres=${reqGenre}&director=${reqDirector.toLowerCase()}&rating=${ratingRange}`))
        // console.log('REQUEST', request)
        // setSendRequest(true)
        // const encodedRequest = encodeURIComponent(request)
        // console.log('Getting comments...')
        // const response = await axios.get(`/api/comments/${request}`)
        // const data = await response.data
        // setComments(data.comments)
        // setMovies(data.movies)

        // const ids = []
        // data
        //     .map(e => e.movie_id)
        //     .forEach(e => {
        //         if (!ids.includes(e)) {
        //             ids.push(e)
        //         }
        //     })
        // setMovieIds(ids)
        // console.log('COMMENTS -', ids)
    }

    return (
        <div className="search">
            <div className="white_bg">
                <form className="form" onSubmit={getComments}>
                    <label htmlFor="title">Movie Title</label>
                    <input type="text" id='title' value={reqTitle} onChange={e => setReqTitle(e.target.value)} />
                    <label htmlFor="genre">Genre</label>
                    <select id='genre' onChange={e => setReqGenre(e.target.value)}>
                        <option value="">Choose a genre</option>
                        {genres?.map((genre, i) => (
                            <option value={genre.toLowerCase()} key={i}>{genre}</option>
                        ))}
                    </select>
                    <label htmlFor="director">Director</label>
                    <input type="text" id='director' value={reqDirector} onChange={e => setReqDirector(e.target.value)} />
                    <label htmlFor="ratings">Rating Stars</label>
                    <RatingBar id='ratings' returnRatings={setReqRating} />

                    <button type="submit">SEARCH</button>
                </form>
                <div className="show">
                    <button onClick={() => setShowReq(!showReq)}>
                        Show request build
                    </button>
                    {showReq ? (
                        <div className="result" style={{ fontSize: '12px', fontWeight: 'bold', color: 'red', textAlign: 'center', padding: '10px 0' }}>- REQUEST - {requestBuild}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}
