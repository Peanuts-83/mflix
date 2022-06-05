import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import SearchForm from "./SearchForm"
import LoadingModal from 'components/LoadingModal'

export default function Layout({ children, setComments, setMovies }) {
    const [loading, setLoading] = useState(false)

    return (
        <>
            {loading && <LoadingModal />}
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
                    <SearchForm setComments={setComments} setMovies={setMovies} setLoading={setLoading} />
                </header>
                <main>
                    {children}
                </main>
                <div className="spacer"></div>
                <footer>copyrights © Peanuts83</footer>
        </>
    )
}

// export async function getStaticProps() {
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
//         .toArray()

//     // genres = Object.values(genres).map(e => e)
//     console.log('GENRES -', genres)

//     return {
//         props: {
//             genresList: JSON.parse(JSON.stringify(genres))
//         }
//     }
// }