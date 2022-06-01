import logo from 'assets/MFLIX.png'
import Image from 'next/image'
import { useState, useEffect } from 'react'
// import clientPromise from '../lib/mongodb'
// import { connectToDatabase } from 'util/mongodb'

export default function Home({ props }) {
  const {movies, comments} = props

  useEffect(() => {
    console.log('PROPS -', props)
  }, [props])

  // TODO: SWR middleware to put in place for caching/store management + SWRPagination

  return (
    <div className="container">
      test <br />

      <ul>
        {movies?.map((movie, i) => {
          return comments[i]?.length > 0 && (
          <li>
            <div>
              {movie.title}
            </div>
            <ul>
              {comments[i]?.map(comment => (
                <li>
                  {comment.text}
                </li>
              ))}
            </ul>
          </li>
        )})}
      </ul>

    </div>
  )
}
