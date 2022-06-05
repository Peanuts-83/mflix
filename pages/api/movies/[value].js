import { connectToDatabase } from "util/mongodb"
const ObjectId = require('mongodb').ObjectId

export default async function (req, res) {
    const { value } = req.query
    const { db } = await connectToDatabase()

    let typeOfRequest, movies, id, title, genre, director, rating

    console.log('QUERY', value);
    if (value === null) return

    switch (value.split('&').length) {
        case 1:
            typeOfRequest = 'ID_REQ'
            id = query
            console.log('CASE ID');
            break
        default:
            typeOfRequest = 'FORM_REQ'
            console.log('CASE FORM');
            [title, genre, director, rating] = value.split('&')
            title = title.split('=')[1]
            genre = genre.split('=')[1]
            director = director.split('=')[1]
            rating = rating.split('=')[1].split(',')
            console.log(`SEARCH values - ${title}, ${genre}, ${director}, ${rating}`)
    }


    // GET Matching movies [ _id, title, poster ]
    switch (typeOfRequest) {
        case 'ID_REQ':
            const obj_id = new ObjectId(id)
            movies = await db
                .collection('movies')
                .find({ _id: obj_id })
                .project({
                    _id: "$_id",
                    title: "$title",
                    poster: "$poster",
                })
                .toArray()
            break

        case 'FORM_REQ':
            const request = {}
            const requestValues = { title, genre, director }
            for (let key of Object.keys(requestValues)) {
                if (key && requestValues[key] !== '') {
                    request[key] = new RegExp(requestValues[key], 'i')
                }
            }

            request["imdb.rating"] = { '$gte': Math.min(...rating), '$lte': Math.max(...rating) }

            // GET matching movies _id
            movies = await db
                .collection('movies')
                .find(request)
                .project({
                    _id: "$_id",                // Object_id
                    title: "$title",            // ''
                    poster: "$poster",          // 'url'
                    genres: "$genres",            // []
                    directors: "$directors",      // []
                    rating: "$imdb.rating",      // []
                    year: "$year"
                })
                // .limit(500)
                .toArray()
            console.log('MOVIES found -', movies.map(e => e.year).filter(e=> String(e).includes('è')))
    }

    res.json(movies)
}
