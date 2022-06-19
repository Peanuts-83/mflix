import { connectToDatabase } from 'util/mongodb'

export default async function (req, res) {
    const { db } = await connectToDatabase()

    const movies = await db
        .collection("movies")
        .aggregate([
            {
                '$match': {
                    'imdb.rating': {
                        '$ne': ''
                    }
                }
            }, {
                '$sort': {
                    'imdb.rating': -1
                }
            }, {
                '$limit': 50
            }, {
                '$group': {
                    '_id': '$title',
                    'data': {
                        '$first': '$$ROOT'
                    }
                }
            }, {
                '$sort': {
                    'data.imdb.rating': -1
                }
            }, {
                '$limit': 20
            }
        ])
        .toArray()

    // INITIAL REQUEST not parsing doubles in $title //
    // const movies = await db
    //     .collection("movies")
    //     .find({})
    //     .filter(
    //         { 'imdb.rating': { $ne: '' } },
    //         { 'title': { $nin: '$$ROOT' } }
    //     )
    //     .sort({ 'imdb.rating': -1, 'year': -1 })
    //     .limit(20)
    //     .toArray()

    res.json(movies.map(e => e.data))
}
