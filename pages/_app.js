import Head from "next/head"
import Layout from 'components/layout'
import logo from 'assets/back_up.png'
import Image from 'next/image'
import 'styles/app.css'
import { useState, useEffect } from "react"
import axios from "axios"
// import { connectToDatabase } from "util/mongodb"

export default function App({ Component }) {
    const [comments, setComments] = useState('Base comments')
    const [movies, setMovies] = useState()

    return (
        <div>
            <Head>
                <title>MFLIX - Make up your advice</title>
            </Head>

            <Layout setComments={setComments} setMovies={setMovies} >
                <Component props={{comments, movies}} />
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