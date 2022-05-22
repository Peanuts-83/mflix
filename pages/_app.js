import Head from "next/head"
import logo from 'assets/back_up.png'
import Image from 'next/image'
import Link from "next/link"
import 'styles/app.css'

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

    return (
        <div>
            <Head>
                <title>MFLIX - Make up your advice</title>
            </Head>
            <header>
                <nav>
                    {navLinks.map((link, i) => (
                        <Link href={link.path} key={i}>{link.name}</Link>
                    ))}
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
            <footer>copyrights © Tom R.</footer>
        </div>
    )
}