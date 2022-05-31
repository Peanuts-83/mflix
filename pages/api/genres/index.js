import React from 'react'
import { connectToDatabase } from 'util/mongodb'

export default async function (req, res) {
    const { db } = await connectToDatabase()

    const genresList = await db
        .collection('movies')
        .aggregate([
            { $unwind: "$genres" },
            {
              $group: {
                _id: "$genres"
              }
            },
            { $sort: { _id: 1 } }
          ])
          .toArray()

          res.json(genresList.map(e => e['_id']))
}
