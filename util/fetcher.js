import axios from 'axios'

export function fetcher([verb, url]) {
    const verbs = {
        get: 'get',         //read
        post: 'post',       // Create (++ many times same ressource)
        put: 'put',         // Update/Replace
        patch: 'patch',     // Update/Modify (not complete ressource)
        delete: 'delete',   // Delete

    }
    axios.verbs[verb](url).then(res => res.data)
}