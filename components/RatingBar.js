import style from 'styles/components/ratingBar.module.css'
import { useRef, useState, useEffect } from 'react'

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


const RatingBar = () => {
    const start = useRef()
    const end = useRef()
    const outputStart = useRef()
    const outputEnd = useRef()
    const gap = useRef()
    const [startX, setStartX] = useState('0px')
    const [endX, setEndX] = useState('0px')

    const [startValue, setStartValue] = useState(0)
    const [endValue, setEndValue] = useState(5)

    if (typeof window !== 'undefined') {

        window.addEventListener('resize', debounce(handleResize, 50))
        // return _ => {
        //     window.removeEventListener('resize', handleResize)
        // }
    }

    function handleResize() {
        setStartX(`${(((start.current.clientWidth - 32) / 5) * startValue) + 28}px`)
        setEndX(startValue !== endValue
            ? `${(Math.round((end.current.clientWidth - 32) / 5) * endValue) - (Math.round((start.current.clientWidth - 32) / 5) * startValue) - 24}px`
            : '0')
    }

    useEffect(() => {
        gap.current.style.left = startX
        gap.current.style.width = endX
    }, [startX, endX])

    useEffect(() => {
        if (startValue > endValue) {
            setEndValue(startValue)
            setStartValue(endValue)
        }
        const rect = start.current.getBoundingClientRect()
        console.log('POSX', rect.left)
        outputStart.current.style.left = `${(Math.round((start.current.clientWidth - 32) / 5) * startValue)}px`
        outputEnd.current.style.left = `${(Math.round((end.current.clientWidth - 32) / 5) * endValue)}px`
        handleResize()
    }, [startValue, endValue, endX])

    function changeValue(e, cursor) {
        console.log('CURSOR', cursor, startValue, endValue);
        cursor === 'start' ? setStartValue(e.target.value) : setEndValue(e.target.value)
    }

    function chooseRange(e) {
        console.log(e.target.value)
    }

    return (
        <>
            <div className={style.container}>
                <span className={style.outputStart} ref={outputStart}>{startValue}</span>
                <span className={style.outputEnd} ref={outputEnd}>{endValue}</span>
                <span className={style.gap} ref={gap}></span>
                <input
                    type="range"
                    min='0' max='5'
                    value={startValue}
                    title={startValue}
                    id={style.start}
                    className={style.bar}
                    onMouseOver={chooseRange}
                    onChange={(e) => changeValue(e, 'start')}
                    ref={start}
                />
                <input
                    type="range"
                    min='0' max='5'
                    value={endValue}
                    title={endValue}
                    id={style.end}
                    className={style.bar}
                    onMouseOver={chooseRange}
                    onChange={(e) => changeValue(e, 'end')}
                    ref={end}
                />
            </div>
        </>
    )
}

export default RatingBar