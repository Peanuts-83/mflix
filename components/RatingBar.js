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
    const [endValue, setEndValue] = useState(10)

    if (typeof window !== 'undefined') {
        window.addEventListener('resize', debounce(handleResize, 50))
        // return _ => {
        //     window.removeEventListener('resize', handleResize)
        // }
    }

    function handleResize() {
        if (start.current && start.current !== null) {
            setStartX(`${(((start.current.clientWidth - 32) / 10) * startValue) + 25}px`)
            setEndX(startValue !== endValue
                ? `${(Math.round((end.current.clientWidth - 32) / 10) * endValue) - (Math.round((start.current.clientWidth - 32) / 10) * startValue) - 10}px`
                : '0')
        }
    }

    useEffect(() => {
        gap.current.style.left = startX
        gap.current.style.width = endX
    }, [startX, endX])

    useEffect(() => {
        console.log('START', startValue, 'END', endValue);
        if (startValue > endValue) {
            console.log(('SUP'));
            setEndValue(startValue)
            setStartValue(endValue)
        }
        if (startValue === endValue) {
            console.log('===', startValue, endValue);
            outputEnd.current.style.display = 'none'
        } else {
            console.log('!==');
            outputEnd.current.style.display = 'block'
        }
        const rect = start.current.getBoundingClientRect()
        console.log('POSX', rect.left)
        outputStart.current.style.left = startValue === 10
            ? `${(Math.round((start.current.clientWidth - 30) / 10) * startValue) - 13}px`
            : `${(Math.round((start.current.clientWidth - 30) / 10) * startValue) - (startValue * 2.4 - 10) * .7}px`
        outputEnd.current.style.left = endValue === 10
            ? `${(Math.round((end.current.clientWidth - 32) / 10) * endValue) - 13}px`
            : `${(Math.round((end.current.clientWidth - 40) / 10) * endValue) - (endValue - 10) * .7}px`
        handleResize()
    }, [startValue, endValue, endX])

    function changeValue(e, cursor) {
        console.log('CURSOR', cursor, startValue, endValue);
        cursor === 'start' ? setStartValue(+e.target.value) : setEndValue(+e.target.value)
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
                    min='0' max='10'
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
                    min='0' max='10'
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