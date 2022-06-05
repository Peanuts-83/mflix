import { ObjectId } from "mongodb"
import { connectToDatabase } from "util/mongodb"
// const ObjectId = require('mongodb').ObjectId

export default async function (req, res) {
    const { db } = await connectToDatabase()
    let { moviesID } = req.query
    moviesID = moviesID.split(',')
    const data = {}

    for (let id of moviesID) {
        console.log('ID -', id)
        const obj_id = new ObjectId(id)
        data[id] === undefined
            ? data[id] =
                await db
                    .collection('comments')
                    .find({ movie_id: obj_id })
                    .toArray()

            : data[id].push(
                await db
                    .collection('comments')
                    .find({ movie_id: obj_id })
                    .toArray()
            )
    }

    console.log('COMMENTS', data);

    // // PARSE request values
    // if (movie.split('&').length > 1) {
    //     reqType = 'FORM_REQ';
    //     [title, genre, director, rating] = movie.split('&')
    //     title = title.split('=')[1]
    //     genre = genre.split('=')[1]
    //     director = director.split('=')[1]
    //     rating = rating.split('=')[1].split(',')
    //     console.log(`SEARCH values - ${title}, ${genre}, ${director}, ${rating}`)
    // } else {
    //     reqType = 'ID_REQ'
    //     id = movie.split('&')[1]
    //     console.log('ID -', id)
    // }

    // if (reqType === '') return

    // let data = {}

    // switch (reqType) {
    //     case 'ID_REQ':
    //         const objectId = new ObjectId(id)
    //         data.movies = [
    //             await db
    //                 .collection('movies')
    //                 .find({ _id: objectId })
    //                 .project({
    //                     _id: "$_id",
    //                     title: "$title",
    //                     genres: "$genres",
    //                     directors: "$directors",
    //                     rating: "$imdb.rating"
    //                 })
    //                 .limit(10)
    //         ]
    //         data.comments = [
    //             await db
    //                 .collection('comments')
    //                 .find({ movie_id: objectId })
    //                 .sort({ date: -1 })
    //                 .project({ _id: 0})
    //                 .toArray()
    //         ]

    //         console.log('DATA -', data);
    //         break

    //     case 'FORM_REQ':
    //         const request = {}
    //         const requestValues = { title, genre, director }
    //         for (let key of Object.keys(requestValues)) {
    //             if (key && requestValues[key] !== '') {
    //                 request[key] = new RegExp(requestValues[key], 'i')
    //             }
    //         }

    //         request["imdb.rating"] = { '$gte': Math.min(...rating), '$lte': Math.max(...rating) }
    //         console.log('REQUEST -', request);

    //         // GET matching movies _id
    //         data['movies'] = await db
    //             .collection('movies')
    //             .find(request)
    //             .project({
    //                 _id: "$_id",
    //                 title: "$title",
    //                 genres: "$genres",
    //                 directors: "$directors",
    //                 rating: "$imdb.rating"
    //             })
    //             .toArray()
    //         console.log('MOVIES found -', data.movies);

    //         // GET comments for each match
    //         data['comments'] = await Promise.all(data.movies.map((movie, i) => {
    //             return db.collection('comments')
    //                 .find({ movie_id: data.movies[i]._id })
    //                 .sort({ date: -1 })
    //                 .toArray()
    //         }))

    //         console.log('DATA -', data);
    //         break

    //     default:
    //         console.log('API route error');
    //         return
    // }

    // console.log(('DATA', data));

    res.json(data)
}
