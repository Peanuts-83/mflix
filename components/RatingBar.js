import style from 'styles/components/ratingBar.module.scss'
import { useRef, useState, useEffect } from 'react'

// TIMER function to limit the number of refresh window width
function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

/**
 * RatingBar component
 * @param {function} returnRatings - Setter to send back min/max ratings to parent component
 * @returns min & max rating range search
 */
 export default function RatingBar ({ returnRatings }) {
    const start = useRef()
    const end = useRef()
    const outputStart = useRef()
    const outputEnd = useRef()
    const gap = useRef()
    // Xpos of both min & max buttons
    const [startX, setStartX] = useState('0px')
    const [endX, setEndX] = useState('0px')

    // MIN & MAX values to be returned
    const [startValue, setStartValue] = useState(0)
    const [endValue, setEndValue] = useState(10)

    // Do nothing on SSR, act only on CSR
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', debounce(handleResize, 50))
    }

    // Calculate Xpos for min & max buttons
    function handleResize() {
        if (start.current && start.current !== null) {
            setStartX(`${(((start.current.clientWidth - 32) / 10) * startValue) + 25}px`)
            setEndX(startValue !== endValue
                ? `${(Math.round((end.current.clientWidth - 32) / 10) * endValue) - (Math.round((start.current.clientWidth - 32) / 10) * startValue) - 10}px`
                : '0')
        }
    }

    // RETURN min & max values to parent component
    useEffect(() => {
        returnRatings([startValue, endValue])
    }, [startValue, endValue])

    // SET yellow bar length & Xpos between min & max buttons
    useEffect(() => {
        gap.current.style.left = startX
        gap.current.style.width = endX
    }, [startX, endX])

    // Calculate Xpos of each button on user's actions depending on window width
    useEffect(() => {
        if (startValue > endValue) {
            setEndValue(startValue)
            setStartValue(endValue)
        }
        if (startValue === endValue) {
            outputEnd.current.style.display = 'none'
        } else {
            outputEnd.current.style.display = 'block'
        }
        const rect = start.current.getBoundingClientRect()
        outputStart.current.style.left = startValue === 10
            ? `${(Math.round((start.current.clientWidth - 32) / 10) * startValue) - 2}px`
            : `${(Math.round((start.current.clientWidth - 40) / 10) * startValue) + 7}px`
        outputEnd.current.style.left = endValue === 10
            ? `${(Math.round((end.current.clientWidth - 32) / 10) * endValue) - 2}px`
            : `${(Math.round((end.current.clientWidth - 40) / 10) * endValue) + 7}px`
        handleResize()
    }, [startValue, endValue, endX])

    // SET min or max value depending on user's action
    function changeValue(e, cursor) {
        cursor === 'start' ? setStartValue(+e.target.value) : setEndValue(+e.target.value)
    }


    return (
        <>
            <div className={style.container}>
                <span className={style.outputStart} ref={outputStart}>{startValue}</span>
                <span className={style.outputEnd} ref={outputEnd}>{endValue}</span>
                <span className={style.gap} ref={gap}></span>
                <input
                    type="range"
                    min='0' max='10'
                    value={startValue}
                    title={startValue}
                    id={style.start}
                    className={style.bar}
                    onChange={(e) => changeValue(e, 'start')}
                    ref={start}
                />
                <input
                    type="range"
                    min='0' max='10'
                    value={endValue}
                    title={endValue}
                    id={style.end}
                    className={style.bar}
                    onChange={(e) => changeValue(e, 'end')}
                    ref={end}
                />
            </div>
        </>
    )
}
