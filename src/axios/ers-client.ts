import axios from 'axios'


//base http request
export const ersClient = axios.create({
    baseURL: 'http://ec2-18-220-25-148.us-east-2.compute.amazonaws.com:9050',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true
}
)
