db.getCollection("movies").aggregate([
    { $match: { 'imdb.rating': { $ne: '' } } },
    
    {
        $group:
            { _id: { title: "$title", rating: '$imdb.rating', genres: '$genres', year: '$year' } }
    },
    { $sort: { rating: -1 } },
    {
        $project: {
            year: 1,
            title: 1,
            rating: 1,
            genres: 1
        }
    },
    
])
