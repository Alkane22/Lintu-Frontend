import axios from 'axios'
const server = 'http://localhost:3001'

const login = async credentials => {
    const res = await axios.post(server + '/api/user/login', credentials, {headers: {'Content-Type': 'application/json'}})
    return res.data
}

export default {login}