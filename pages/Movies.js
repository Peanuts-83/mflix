import { connectToDatabase } from "../util/mongodb"
import ImageWithFallback from "components/ImageWithFallback"
import default_movie from 'assets/default_movie.png'
import style from 'styles/results.module.css'

export default function Movies({ movies }) {
    return (
        <div className={style.container}>
            <h1>Top 20 films of all time</h1>
            <p>
                <small>(according to metacritics)</small>
            </p>
            <ul className={style.movies}>
                {movies.map((movie, i) => (
                    <li className={style.movie} key={i}>
                        {movie.poster && (
                            <img
                                className={style.affiche}
                                src={movie.poster}
                                fallback={default_movie}
                                alt='Affiche'
                                layout='fill' />

                        )}
                            <div className={style.txtAffiche}>
                                <h2>{movie.title}</h2>
                                {movie.imdb && (
                                    <small>Ratings : {movie.imdb.rating}</small>

                                )}
                                <p>{movie.plot}</p>
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const { db } = await connectToDatabase()

    const movies = await db
        .collection('movies')
        .find({})
        .sort({ 'imdb.rating': -1 })
        .filter({ 'imdb.rating': { $ne: '' } })
        .limit(20)
        .toArray()
        // .distinct("title")

        console.log('ARray', movies);
    return {
        props: {
            movies: JSON.parse(JSON.stringify(movies))
        }
    }
}