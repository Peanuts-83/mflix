import style from 'styles/components/ratingBar.module.css'
import { useRef, useState, useEffect } from 'react'


const RatingBar = () => {
    const start = useRef()
    const end = useRef()
    const [startValue, setStartValue] = useState(0)
    const [endValue, setEndValue] = useState(5)

    useEffect(() => {
        if (startValue > endValue) {
            setEndValue(startValue)
            setStartValue(endValue)
        }
    }, [startValue, endValue])

    function changeValue(e, cursor) {
        console.log('CURSOR', cursor, startValue, endValue);
        cursor === 'start' ? setStartValue(e.target.value) : setEndValue(e.target.value)
    }

    return (
        <>
            <div className={style.container}>
                <input type="range" min='0' max='5' value={startValue} title={startValue} id={style.start} className={style.bar} onChange={(e) => changeValue(e, 'start')} ref={start} />
                <input type="range" min='0' max='5' value={endValue} title={endValue} id={style.end} className={style.bar} onChange={(e) => changeValue(e, 'end')} ref={end} />
            </div>
        </>
    )
}

export default RatingBar