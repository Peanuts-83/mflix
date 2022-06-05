import Head from "next/head"
import Layout from 'components/layout'
import 'styles/app.css'
import { useState, useEffect } from "react"

export default function App({ Component }) {
    // const [comments, setComments] = useState('Base comments')
    const [movies, setMovies] = useState()

    return (
        <div>
            <Head>
                <title>MFLIX - Make up your advice</title>
            </Head>

            <Layout setMovies={setMovies} >
                <Component props={{ movies }} />
            </Layout>

        </div>
    )
}

// _app.getInitialProps = async (ctx) => {
//     const { db } = await connectToDatabase()

//     let genres = await db
//         .collection('movies')
//         .aggregate([
//             { $unwind: "$genres" },
//             {
//                 $group: {
//                     _id: "genres"
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ])

//     // genres = Object.values(genres).map(e => e)
//     console.log('GENRES -', genres)

//     return {
//         props: {
//             genresList: JSON.parse(JSON.stringify(genres))
//         }
//     }
// }