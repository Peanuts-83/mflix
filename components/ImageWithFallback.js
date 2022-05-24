import Image from 'next/image'
import { useState } from 'react'


export default function ImageWithFallback({ src, fallback, ...rest }) {
    const [imgSrc, setImgSrc] = useState(src)


    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => setImgSrc(fallback)}
        />
    )
}
