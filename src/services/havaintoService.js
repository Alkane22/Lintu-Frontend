import axios from 'axios'
const server = 'http://localhost:3001' //'https://lintu-bongarit.herokuapp.com' //'http://localhost:3001'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getHavainnot = async () => {
    const res = await axios.get(server + '/api/havainnot')
    return res.data
}

const createHavainto = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.post(server + '/api/havainnot', newObject, config)
    return res.data
}

const deleteHavainto = async id => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.delete(server + '/api/havainnot/' + id, config)
    return res.data
}

const searchBird = async birdName => {
    const res = await axios.get(server + '/api/havainnot/search/' + birdName)
    return res
} 

export default { 
    setToken,
    getHavainnot,
    createHavainto,
    deleteHavainto,
    searchBird
}