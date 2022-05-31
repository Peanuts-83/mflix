import { connectToDatabase } from "../util/mongodb"
import ImageWithFallback from "components/ImageWithFallback"
import default_movie from 'assets/default_movie.png'
import style from 'styles/results.module.css'
import Image from 'next/image'

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
                        <div className={style.txtAffiche}>
                            <h2>{movie.title}</h2>
                            {movie.imdb && (
                                <small>Ratings : {movie.imdb.rating}</small>

                            )}
                            <p>{movie.plot}</p>
                        </div>
                        <div></div>
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
        .aggregate([
            { $match: { 'imdb.rating': { $ne: '' } } },
            {
                $group: {
                    _id: '$title',
                    title: { $first: "$title" },
                    plot: { $first: "$plot" },
                    imdb: { $first: "$imdb" },
                    poster: { $first: "$poster" },
                }
            },
            { $sort: { 'imdb.rating': -1, 'year': -1, 'title': -1 } }
        ])
        .limit(20)
        .toArray()

    console.log('ARray', movies.map(m => `${m.title} >> ${m.poster}`));
    return {
        props: {
            movies: JSON.parse(JSON.stringify(movies))
        }
    }
}