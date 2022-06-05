import genresApiCall from 'pages/api/genres'

export async function loadGenres() {
    const genres = await genresApiCall()
    console.log ('GENRESSS', genres)
    return genres
}