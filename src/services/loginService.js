import axios from 'axios'
const server = 'https://lintu-bongarit.herokuapp.com' //'https://lintu-bongarit.herokuapp.com' //'http://localhost:3001'


const login = async credentials => {
    const res = await axios.post(server + '/api/user/login', credentials, {headers: {'Content-Type': 'application/json'}})
    return res.data
}

const checkToken = async token => {
    const res =  await axios.get(server + '/api/user/checkToken', {headers: { Authorization: `bearer ${token}`}})
    return res.data
}

const register = async userObj => {
    const res = await axios.post(server + '/api/user', userObj)
    return res.data
}

export default {login, checkToken, register}