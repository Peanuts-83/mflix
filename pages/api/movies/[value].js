import { connectToDatabase } from "util/mongodb"
const ObjectId = require('mongodb').ObjectId

export default async function (req, res) {
    const { value } = req.query
    const { db } = await connectToDatabase()

    let typeOfRequest, movies, id, title, genres, directors, rating

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
            [title, genres, directors, rating] = value.split('&')
            title = title.split('=')[1]
            genres = genres.split('=')[1]
            directors = directors.split('=')[1]
            rating = rating.split('=')[1].split(',')
            console.log(`SEARCH values - ${title}, ${genres}, ${directors}, ${rating}`)
    }


    // GET Matching movies [ _id, title, poster ]
    switch (typeOfRequest) {
        case 'ID_REQ':
            const obj_id = new ObjectId(id)
            movies = await db
                .collection('movies')
                .aggregate([
                    {$match: {
                        _id: obj_id
                    }},
                    {$sort: {
                        year: -1,
                        'imdb.rating': -1
                    }},
                    {$group: {
                        _id: '$title',
                        data: {
                            '$first': '$$ROOT'
                        }
                    }}
                ])
                .toArray()
            break

        case 'FORM_REQ':
            const request = {}
            const requestValues = { title, genres, directors }
            for (let key of Object.keys(requestValues)) {
                if (key && requestValues[key] !== '') {
                    request[key] = new RegExp(requestValues[key], 'i')
                }
            }

            request["imdb.rating"] = { '$gte': Math.min(...rating), '$lte': Math.max(...rating) }
            console.log('REQUEST', request);
            // GET matching movies _id
            movies = await db
                .collection('movies')
                .aggregate([
                    {$match: request},
                    {$sort: {
                        year: -1,
                        'imdb.rating': -1
                    }},
                    {$group: {
                        _id: '$title',
                        data: {
                            '$first': '$$ROOT'
                        }
                    }},
                ])
                .toArray()
            console.log('MOVIES found -', movies.length)
    }

    res.json(movies.map(e => e.data))
}
