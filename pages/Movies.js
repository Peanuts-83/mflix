import { connectToDatabase } from "../util/mongodb"

export default function Movies({ movies }) {
    return (
        <div>
            <h1>Top 20 films of all time</h1>
            <p>
                <small>according to metacrtics</small>
            </p>
            <ul>
                {movies.map(movie => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritics}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase()

    const movies = await db
        .collection('movies')
        .find({})
        .sort({ metacritics: -1 })
        .limit(20)
        .toArray()

    return {
        props: {
            movies: JSON.parse(JSON.stringify(movies))
        }
    }
}