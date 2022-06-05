import axios from 'axios'

export async function fetcher(verb, url, body = '') {
    const verbs = {
        get: 'get',         //read
        post: 'post',       // Create (++ many times same ressource)
        put: 'put',         // Update/Replace
        patch: 'patch',     // Update/Modify (not complete ressource)
        delete: 'delete',   // Delete

    }

    switch (verb) {
        case 'get':
            return axios.get(url)
            break
        case 'post':
            return axios.post(url, body)
            break
        case 'put':
            return axios.put(url, body)
            break
        case 'patch':
            return axios.patch(url, body)
            break
        case 'delete':
            return axios.delete(url, body)
            break
        default:
            throw new Error(`Wrong fetcher call with \nVERB: ${verb}\nURL: ${url}\nBODY: ${body}`)
    }
}
