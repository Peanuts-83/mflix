// Genres available for SELECT
const {data: genres, error: genresErr} = useRequest('/api/genres')

const [sendRequest, setSendRequest] = useState(false)
// const {data: movies, error: moviesErr, loading} = useRequest(sendRequest ? `/api/comments/${request}` : null)

// FORM requested values
const [reqTitle, setReqTitle] = useState('')
const [reqGenre, setReqGenre] = useState('')
const [reqDirector, setReqDirector] = useState('')
const [reqRating, setReqRating] = useState([])

// RESPONSE values
const [movieIds, setMovieIds] = useState([])
const [directors, setDirectors] = useState([])
const [ratings, setRatings] = useState([])

// REQUEST
const [request, setRequest] = useState('')
// const [encodedRequest, setEncodedRequest] = useState('')
const [showReq, setShowReq] = useState(false)

useEffect(() => console.log('GENRES from search', genres, genresErr), [genres])
// useEffect(() => console.log('MOVIES from search', movies, moviesErr), [movies])


// BUILD REQUEST
useEffect(() => {
    const ratingRange = []
    for (let i = reqRating[0]; i <= reqRating[1]; i++) {
        ratingRange.push(i)
    }
    setRequest(encodeURIComponent(`title=${reqTitle.toLowerCase()}&genre=${reqGenre}&director=${reqDirector.toLowerCase()}&rating=${ratingRange}`))
}, [reqTitle, reqDirector, reqGenre, reqRating])

// useEffect(() => {

// }, [request])

// GET comments
async function buildAndSendRequest(e) {
    e.preventDefault()
    setSendRequest(true)
    // console.log('Getting comments...')
    const response = await axios.get(`/api/comments/${encodedRequest}`)
    const data = await response.data
    setComments(data.comments)
    setMovies(data.movies)
    // const ids = []
    // data
    //     .map(e => e.movie_id)
    //     .forEach(e => {
    //         if (!ids.includes(e)) {
    //             ids.push(e)
    //         }
    //     })
    // setMovieIds(ids)
    // console.log('COMMENTS -', ids)
}