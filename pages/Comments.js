import { connectToDatabase } from "util/mongodb"
import Link from "next/link"
import useSWR from 'swr'
import axios from "axios";
import { fetcher } from "util/fetcher";
import { useRef, useState, useEffect } from "react";
import style from 'styles/results.module.css'

export default function Comments({ comments, movies }) {
    const results = useRef(null)
    const moviesList = movies.map(movie => movie.title)
    const [selected, setSelected] = useState('')
    const [data, setData] = useState([])
    const [movieId, setMovieId] = useState([])
    const [userComment, setUserComment] = useState([])

    useEffect(() => {
        console.log('Title -', selected);
        const selectedReq = encodeURIComponent(selected)
        console.log('ReqTitle -', selectedReq);
        if (selected !== '') {
            axios
                .get(`/api/comments/name&${selectedReq}`)
                .then(res => setData(res.data))
        }
    }, [selected])

    // useEffect(() => console.log('DATA -', data), [data])

    // useEffect(() => console.log(('COMMENTSDATA -', movieId)))

    function exposeComments(movie_id) {
        setMovieId(movie_id)
        const allMovieComments = document.querySelectorAll('.movieComment')
        const target = document.getElementById(`${movie_id}`)

        allMovieComments.forEach(elt => elt.innerHTML = '')

        const HTML = comments.filter(comment => comment.movie_id === movie_id)
        console.log('HTML -', HTML);
        // setUserComment(HTML)
        target.innerHTML = HTML.map((comment, i) => (
            `<li key=${i}>
                <h4>${comment.name}</h4>
                <small>${comment.date}</small>
                <p>${comment.text}</p>
            </li>`
        ))
    }

    return (
        <div className={style.container}>
            <div>
                <select name="movies" id="movies" onChange={e => setSelected(e.target.value)} value={selected}>
                    <option value="">Select a movie</option>
                    {moviesList.map((name, i) => (
                        <option value={name} key={i}>{name}</option>
                    ))}
                </select>
            </div>
            <div className="results" ref={results}>
                {selected === '' ? (
                    <div></div>
                ) : (
                    <div>
                        {console.log('MyData -', data)}
                        <div>Number of critics: {data.length}</div>
                        <ul>
                            {data.map((comment, i) => (
                                <li key={i}>
                                    <h3><a href={`mailto:${comment.email}`}>{comment.name}</a></h3>
                                    <small>{comment.date}</small>
                                    <p>{comment.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                )}
            </div>
            <h1>20 Most recent comments</h1>
            <small>(on Metacritics)</small>
            <ul>
                {comments.map((comment, i) => (
                    <li key={i}>
                        <h2>{comment.name} - {movies.filter(movie => movie._id === comment.movie_id)[0].title}</h2>
                        <small>{comment.date}</small>
                        <p><em>{comment.email}</em></p>
                        <div className={style.txtAffiche}>
                            <img className={style.affiche} src={movies.filter(movie => movie._id === comment.movie_id)[0].poster} alt="affiche" />
                            <p>{comment.text}</p>
                        </div>
                        <div className={style.link} onClick={() => exposeComments(comment.movie_id)}>
                            All comments on this movie
                        </div>
                        <ul className="movieComment" id={comment.movie_id}>
                            {userComment?.map((comment, i) => (
                                <li key={i}>
                                    <h4>{comment.name}</h4>
                                    <small>{comment.date}</small>
                                    <p>{comment.text}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const { db } = await connectToDatabase()
    // const ObjectId = require('mongodb').ObjectId

    const comments = await db
        .collection('comments')
        .find({})
        .sort({ date: -1 })
        .limit(100)
        .toArray()

    const targetMovies = await comments.map(comment => comment.movie_id)

    const movies = await db
        .collection('movies')
        .find({ _id: { $in: targetMovies } })
        .toArray()

    console.log('MOVIES -', movies.map(movie => movie.title));

    return {
        props: {
            comments: JSON.parse(JSON.stringify(comments)),
            movies: JSON.parse(JSON.stringify(movies))
        }
    }
}