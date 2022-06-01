import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import SearchForm from "./SearchForm"

export default function layout({ children, setComments, setMovies }) {
    return (
        <>
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
                <SearchForm setComments={setComments} setMovies={setMovies} />
            </header>
            <main>
                {children}
            </main>
            <div className="spacer"></div>
            <footer>copyrights © Peanuts83</footer>
        </>
    )
}
