import axios from 'axios'
const server = 'http://localhost:3001'

const getHavainnot = async () => {
    const res = await axios.get(server + '/api/havainnot')
    return res.data
}

export default getHavainnot