import Image from 'next/image'
import { useState, useEffect } from 'react'
import defImg from 'assets/default_movie.png'


export default function ImageWithFallback({ src, fallback, ...rest }) {
    const [imgSrc, setImgSrc] = useState(src)

    function handleError() {
        setImgSrc(fallback)
    }

    // Manage url change on sorting movies
    useEffect(() => {
        setImgSrc(src)
    }, [src])

    return (
        <>
            <Image
                {...rest}
                src={imgSrc}
                placeholder={fallback}
                onError={handleError}
            />
        </>
    )
}
