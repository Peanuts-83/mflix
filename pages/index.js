import { useState, useEffect } from 'react'
import { useRequest } from 'util/useRequest'

export default function Home({ props }) {
  const { movies } = props
  const [moviesPerPage, setMovisePerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState([])


  useEffect(() => {
    console.log('PROPS -', props)
  }, [props])

  // TODO: SWR middleware to put in place for caching/store management + SWRPagination

  return (
    <div className="container">
      test <br />

      <ul>
        {movies?.map((movie, i) => {
          if (i >= moviesPerPage * (page - 1) && i < (moviesPerPage * (page - 1)) + moviesPerPage) {
            return (
              <li key={i}>
                {i+1} - {movie.title} / {movie.year}
              </li>
            )
          }

          // // Display movie if at least one comment
          // return comments[i]?.length > 0 && (
          //   <li key={i}>
          //     <div>
          //       {movie.title} + {movie.rating}
          //     </div>
          //     <ul>
          //       {comments[i]?.map((comment, j) => (
          //         <li key={`${i}-${j}`}>
          //           {comment.text}
          //         </li>
          //       ))}
          //     </ul>
          //   </li>
          // )
        })}
      </ul>
    </div>
  )
}
