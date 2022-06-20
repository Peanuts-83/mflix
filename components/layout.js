import React, { createRef, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import SearchForm from "./SearchForm"
import LoadingModal from 'components/LoadingModal'
import Intentions from './Intentions'

export default function Layout({ children, setMovies }) {
    const [loading, setLoading] = useState(false)
    const intentions = createRef()

    function toggleIntentions() {
        console.log('INTENTIONS', intentions.current.className);
        intentions.current.className === 'intentions' ?
        intentions.current.className = 'intentions show' :
        intentions.current.className = 'intentions'
    }

    return (
        <>
            {loading && <LoadingModal />}
                <header>
                    <nav>
                        <a className='nav' title='Intentions' href='#' onClick={toggleIntentions}>
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
                        <Intentions ref={intentions} toggle={toggleIntentions} />
                    </nav>
                    <div className="top">
                        <Link href='/'>
                            <a>
                                <div className="logo">
                                </div>
                            </a>
                        </Link>
                    </div>
                    <SearchForm setMovies={setMovies} setLoading={setLoading} />
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