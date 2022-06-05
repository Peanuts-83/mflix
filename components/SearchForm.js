import React, { useState, useEffect } from 'react'
import axios from "axios"
import RatingBar from "./RatingBar"
import { useRequest } from 'util/useRequest'

export default function SearchForm({ setMovies, setComments }) {
    const {data: genres, error} = useRequest('/api/genres')

    // FORM requested values
    const [reqTitle, setReqTitle] = useState('')
    const [reqGenre, setReqGenre] = useState('')
    const [reqDirector, setReqDirector] = useState('')
    const [reqRating, setReqRating] = useState([])

    // RESPONSE values
    const [movieIds, setMovieIds] = useState([])
    const [directors, setDirectors] = useState([])
    const [ratings, setRatings] = useState([])

    // REQUEST
    const [request, setRequest] = useState()
    const [showReq, setShowReq] = useState(false)


    useEffect(() => console.log('GENRES from search', genres, error), [])

    // BUILD REQUEST
    useEffect(() => {
        const ratingRange = []
        for (let i = reqRating[0]; i <= reqRating[1]; i++) {
            ratingRange.push(i)
        }
        setRequest(`title=${reqTitle.toLowerCase()}&genre=${reqGenre}&director=${reqDirector.toLowerCase()}&rating=${ratingRange}`)
    }, [reqTitle, reqDirector, reqGenre, reqRating])

    // GET comments
    async function getComments(e) {
        e.preventDefault()
        const encodedRequest = encodeURIComponent(request)
        console.log('Getting comments...')
        const response = await axios.get(`/api/comments/${encodedRequest}`)
        const data = await response.data
        setComments(data.comments)
        setMovies(data.movies)
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
                        <div className="result" style={{ fontSize: '12px', fontWeight: 'bold', color: 'red', textAlign: 'center', padding: '10px 0' }}>- REQUEST - {request}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}
