import Head from "next/head"
import logo from 'assets/back_up.png'
import Image from 'next/image'
import Link from "next/link"
import 'styles/app.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import axios from "axios"
// import { connectToDatabase } from "util/mongodb"
import SearchForm from "components/SearchForm"

export default function App({ Component, pageProps, genresList }) {

    return (
        <div>
            <Head>
                <title>MFLIX - Make up your advice</title>
            </Head>
            <main>
                <header>
                    <nav>
                        <a className='nav' title='Intentions' href='#'>
                            <FontAwesomeIcon icon={faInfoCircle} className='icon' />
                            <p className="icon_text">
                                Intentions
                            </p>
                        </a>
                        <a className='nav' title='Contact' href='mailto:tranque@free.fr'>
                            <FontAwesomeIcon icon={faEnvelope} className='icon' />
                            <p className="icon_text">
                                Contact
                            </p>
                        </a>
                    </nav>
                    <div className="top">
                        <Link href='/'>
                            <a>
                                <div className="logo">
                                </div>
                            </a>
                        </Link>
                    </div>
                    <SearchForm genresList={genresList} />
                </header>
                <Component className='component' {...pageProps} />
                <div className="spacer"></div>
                <footer>copyrights © Peanuts83</footer>
            </main>
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