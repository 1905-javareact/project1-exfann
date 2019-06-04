import axios from 'axios'


//base http request
export const ersClient = axios.create({
    baseURL: 'http://localhost:9050',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true
}
)
