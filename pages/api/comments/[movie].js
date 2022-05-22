import { ObjectId } from "mongodb"
import { connectToDatabase } from "util/mongodb"

export default async function (req, res) {
    const { db } = await connectToDatabase()
    console.log(req.query);
    const { movie } = req.query
    let [type, target] = movie.split('&')
    target = decodeURIComponent(target)
    console.log(type, target);
    if (target === '') return

    let obj_id, data

    switch (type) {
        case 'id':
            console.log('ID');
            obj_id = new ObjectId(target)
            data = await db
                .collection('comments')
                .find({ movie_id: obj_id })
                .sort({ date: -1 })
                .toArray()
            break
        case 'name':
            console.log('NAME', target);
            const [movie] = await db
                .collection('movies')
                .find({ title: target})
                .toArray()
            console.log('ID -', movie._id);
            data = await db
                .collection('comments')
                .find({ movie_id: movie._id })
                .sort({ date: -1 })
                .toArray()
            console.log('DATA -', data);
            break
        default:
            console.log('API route error');
            return
    }

    res.json(data)
}
