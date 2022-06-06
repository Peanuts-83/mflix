import { connectToDatabase } from 'util/mongodb'

export default async function (req, res) {
    const { db } = await connectToDatabase()

    const movies = await db
        .collection("movies")
        .find({})
        .filter({ 'imdb.rating': { $ne: '' } })
        .sort({ 'imdb.rating': -1, 'year': -1 })
        .limit(20)
        .toArray()

    // console.log('RATING', movies[0])
    res.json(movies)
}