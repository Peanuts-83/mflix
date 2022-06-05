import useSWR from "swr";
// import { fetcher } from "./fetcher";

function fetcher(...args) {
    return fetch(...args).then(res => res.json())
}

export function useRequest(url) {
    if (!url) {
        throw new Error(`Wrong fetcher call with URL: ${url}`)
    }

    const { data, error, loading } = useSWR(url, fetcher)
    return { data, error, loading }
}