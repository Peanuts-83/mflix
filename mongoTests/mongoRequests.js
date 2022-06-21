db.getCollection("movies")
    .find({
        title: /chaos/i,
        genres: /drama/i,
        directors: /coline/i,
        "imdb.rating": {$gt:1, $lt:8}
    }, {
            _id: "$_id",
            title: "$title",
            genres: "$genres",
            directors: "$directors",
            rating: "$imdb.rating"
        })
