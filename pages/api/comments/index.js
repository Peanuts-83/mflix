import { connectToDatabase } from "../../../util/mongodb"

export default async function (req, res) {
    const { db } = await connectToDatabase()

    const comments = await db
        .collection('comments')
        .find({})
        .limit(500)
        .sort({ date: -1 })
        .toArray()

    res.json(comments)
}