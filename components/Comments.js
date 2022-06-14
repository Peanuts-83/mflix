import { useState, useEffect } from 'react'
import style from 'styles/index.module.scss'

export default function Comments({ comments, movie }) {
    const [open, setOpen] = useState(false)

    function toggleComments() {
        setOpen(!open)
    }


    return (
        <>
            {comments &&
                comments[movie._id] && comments[movie._id].length > 0 ?
                (
                    <div className={style.seeComments} onClick={toggleComments}>{comments[movie._id].length} comment(s) available</div>
                ) : (
                    <div className={style.noComments}>No comments on this movie</div>
                )}
            {comments &&
                comments[movie._id] && comments[movie._id].length > 0 &&
                comments[movie._id]?.map((comment, k) => (
                    <li className={`${style.liComment} ${open === false && style.hide}`} key={k}>
                        <strong
                            className={style.userName}
                            title={`See all comments from ${comment.name}`}> {comment.name}
                        </strong>
                        <br />
                        <cite className={style.cite}>
                            {comment.text}
                        </cite>
                    </li>
                ))}
        </>
    )
}
