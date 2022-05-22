import Head from "next/head"
import logo from 'assets/back_up.png'
import Image from 'next/image'
import Link from "next/link"
import 'styles/app.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function App({ Component, pageProps }) {
    const navLinks = [
        {
            name: 'Movies',
            path: '/Movies'
        }, {
            name: 'Top',
            path: '/Top'
        }, {
            name: 'Comments',
            path: '/Comments'
        }
    ]

    function showIntentions() {

    }

    return (
        <div>
            <Head>
                <title>MFLIX - Make up your advice</title>
            </Head>
            <main>
                <header>
                    <nav>
                        <a className="icon" title='Intentions' href={showIntentions}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <p className="icon_text">
                                Intentions
                            </p>
                        </a>
                        <a className="icon" title='Contact' href='mailto:tranque@free.fr'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p className="icon_text">
                                Contact
                            </p>
                        </a>
                    </nav>
                    <div className="logo">
                    </div>
                    <div className="search">
                        <div className="white_bg">
                            <form className="form" action="">
                                <label htmlFor="title">Movie Title</label>
                                <input type="text" id='title' />
                                <label htmlFor="genre">Genre</label>
                                <select id='genre'>
                                    <option value="">Choose a genre</option>
                                </select>
                                <label htmlFor="director">Director</label>
                                <input type="text" id='director' />
                                <label htmlFor="ratings">Ratings</label>
                                <input type="text" id='ratings' />

                                <button type="submit">SEARCH</button>
                            </form>
                        </div>
                    </div>
                </header>
                <Component className='component' {...pageProps} />
                <div className="spacer"></div>
                <footer>copyrights © Peanuts83</footer>
            </main>
        </div>
    )
}