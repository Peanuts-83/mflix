import { connectToDatabase } from "util/mongodb"
const ObjectId = require('mongodb').ObjectId

export default async function (req, res) {
    const { id } = req.query
    const { db } = await connectToDatabase()
    const obj_id = new ObjectId(id)

    const movie = await db
        .collection("movies")
        .find({ _id: obj_id })
        .toArray()

    res.json(movie)
}
